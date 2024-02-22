const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";
const authenticateToken = (req, res, next) => {
    let token = req.header("authorization");
    // console.log("token", token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized  ..." });
    }
    try {
        jwt.verify(token,   SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err.message);
            } else {
                // console.log('Token verified successfully:', decoded);
                next();

            }
        });
        } catch (error) {
            console.error("Error verifying token:", error); 
            return res.status(403).json({ error: "Forbidden - Invalid token ..." });
        }
    };

    module.exports = {
        authenticateToken,
    };
