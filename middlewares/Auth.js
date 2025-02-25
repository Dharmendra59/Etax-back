import jwt from "jsonwebtoken";

const ensureAuth = (req, res, next) => {
      const auth = req.headers["authorization"];
      if (auth) {
            return res.status(403).json({ message: "Unauthorized jwt token is required" });
      }
      try{
            const token = auth.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
      }catch(err){
            return res.status(403).json({message: "Unauthorized"})
      }
};
export { ensureAuth };