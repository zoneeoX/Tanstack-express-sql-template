export const verifyRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req.role; 
  
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("No access bro");
    }
  };
};
