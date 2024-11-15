import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
    const authenticate = req.header("authentication");
    const token = authenticate && authenticate.split(" ")[1];  

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "akvCM", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user;
        next(); 
    });
};

export default authentication;
