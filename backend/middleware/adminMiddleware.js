import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await Admin.findById(decoded.adminId).select("-password");

      if (!admin) {
        return res.status(403).json({ message: "Admin not found" });
      }

      req.admin = admin; // Attach admin to req
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header missing" });
  }
};
