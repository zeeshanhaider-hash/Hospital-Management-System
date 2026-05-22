import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Login First"  
            })
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        
        // Find user in DB
        req.user = await User.findById(decodedData.id);

        // ✅ FIX: If user is not found, return error here
        if (!req.user) {
             return res.status(401).json({
                success: false,
                message: "User not found. Invalid Token."
            });
        }

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export const isPatient = (req, res, next) => {
  // ✅ FIX: Check if req.user exists before checking role
  if (!req.user || req.user.role !== "patient") {
        return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};

export const isAdmin = (...roles) => {
    return (req,res,next) => {
        // ✅ FIX: Check if req.user exists before checking role
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({
                success : false,
                message  : "You cannot access this route"
            })
        }
        next()
    }
}