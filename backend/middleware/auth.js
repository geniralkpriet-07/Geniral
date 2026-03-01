import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'campus_captain') {
    return res.status(403).json({ success: false, message: "Require Campus Captain role." });
  }
  next();
};

export const requireStudent = (req, res, next) => {
  if (req.user.role !== 'student' && req.user.role !== 'campus_captain') {
    return res.status(403).json({ success: false, message: "Only Students can create events." });
  }
  next();
};
