import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndcookie } from "../utils/generateToken.js";

export async function signup(req, res) {


    try {
        const{email,password,username}=req.body;
        if(!email || !password || !username){
            return res.status(400).json({succsess:false,message:"All fields are required"})
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({succsess:false,message:"Invalid email"})
        }


        if(password.length < 6){
            return res.status(400).json({succsess:false,message:"Password must be at least 6 characters"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        

        const existingUserByusername = await User.findOne({ username: username });
        if (existingUserByusername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }
        

        const PROFILE_PIC = ["/avatar1.png", "/avatar2.png",
        "/avatar3.png"];


        const image =
          PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];


        const newUser = new User({
        email,
        password: hashedPassword,
        username,
        image,
        });


        generateTokenAndcookie(newUser._id, res);
        
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            
            user:{
                ...newUser._doc,
                password: "",
            }, 
        }); 
        res.status(400).json({ success: false, message: "User creation failed" });
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndcookie(user._id, res);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
                password: "",
            },
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}  
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}