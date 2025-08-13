import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.json({ success: false, message: "Missing Details" });
    }

    //validating email format

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Enter a valid email" });
    }

    //validating strong password
    if (password.length < 8) {
      res.json({ success: false, message: "Enter a strong password" });
    }

    //hashing user password to store it in dbase

    const salt = await bcrypt.genSalt(10); // we can give numbers between 5 to 15
    const hashedPassword = await bcrypt.hash(password, salt);

    //create  a new user object to store it in dbase

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    //save the data in dbase

    const newUser = new userModel(userData);
    const user = await newUser.save();

    //we will get _id from this user..we will use that to generate token inorder to let user to login

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User with that email doesn't exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials(check password length)",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Api to get user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    return res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Api to update the user profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, address, gender, dob, phone } = req.body;
    const imageFile = req.file;

    if (!name || !gender || !dob || !phone) {
      return res.json({ success: false, message: "data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      gender,
      dob,
      phone,
      address: JSON.parse(address),
    });

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageURL = imageUpload.secure_url;

      //save this in dbase
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    return res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//api to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotTime, slotDate } = req.body;

    console.log("📌 Booking appointment for userId:", userId);

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    //checking for slot availabilty
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    console.log("✅ Appointment saved:", newAppointment);

    //save new slots data in docData

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// api to get user appointments for frontend my-apointments page

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId; // ✅ directly from middleware

    console.log("📌 Fetching appointments for userId:", userId);

    if (!userId) {
      return res.json({ success: false, message: "User ID missing" });
    }

    const appointments = await appointmentModel.find({ userId });
    console.log("📦 Appointments found:", appointments);

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user

    if (!appointmentData) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor list

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });

    // ✅ Send success response
    return res.json({
      success: true,
      message: "Appointment cancelled ",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//Api to make online payment for appointment using razorpay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    //creating options for razorpay

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //creation of an order

    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });
  } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message})
  }
};

//api to verify payment of razorpay
const verifyRazorpay=async(req,res)=>{
  try {
    const {razorpay_order_id}=req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)

    console.log(orderInfo)
    
    if(orderInfo.status==="paid"){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      return res.json({
        success:true,message:"Payment successful"
      })
      
    }
    else{
      return res.json({success:false,message:"Payment Failed"})
    }

    
  } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message})
    
  }
}


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};
