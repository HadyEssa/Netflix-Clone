import jwT from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../model/user.model.js";



export async function protectRoute  (req, res, next)  {
    try {
        const token = req.cookies["jwt-netflix"];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token provied" });
        }
        const decoded = jwT.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; 
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

