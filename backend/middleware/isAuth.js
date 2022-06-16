const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const headerToken = req.get("Authorization");
    if (!headerToken) {
        return res.status(401).json({ error: "Not Authorized" });
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(headerToken, process.env.SECRET_KEY);
        if(decodedToken) {
            req.deptId = decodedToken.deptId;
            req.userId = decodedToken.id;
        } else {
            throw new Error('Not Authorized');
        }
    } catch (err) {
        return res.status(401).json({ error: err });
    }
    next();
};