// const jwt = require("jsonwebtoken");

// // function verifyToken(req, res, next) {
// //     const token = req.header("Authorization");
    
// //     if (!token) {
// //         return res.status(401).send({
// //             error: "Access denied",
// //         });
// //     }
    
// //     try {
// //         const decode = jwt.verify(token, "secret");
// //         console.log(decode);
// //         req.user=decode;
// //         next(); 
// //     } catch (err) {
// //         return res.status(401).send({
// //             error: "Invalid token",
// //         });
// //     }
// // }
// // function verifyToken(req, res, next) {
// //     const authHeader = req.header("Authorization");

// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //         return res.status(401).json({ error: "Access denied" });
// //     }

// //     const token = authHeader.split(" ")[1]; 

// //     try {
// //         const decoded = jwt.verify(token, "secret"); 
// //         console.log(decoded);
// //         req.user = decoded; 
// //         next();
// //     } catch (err) {
// //         return res.status(401).json({ error: "Invalid token" });
// //     }
// // }


// // function isAdmin(req,res,next){
// //     if(req.user && req.user.isAdmin){
// //         next();
// //     }else{
// //         return res.status(403).send({
// //             error:"Forbidden"
// //         });
// //     }
// // }


// function verifyToken(req, res, next) {
//     const authHeader = req.header("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Access denied" });
//     }

//     const token = authHeader.split(" ")[1]; 

//     try {
//         const decoded = jwt.verify(token, "secret"); 
//         console.log(decoded);
//         req.user = decoded; 
//         next();
//     } catch (err) {
//         return res.status(401).json({ error: "Invalid token" });
//     }
// }

// function isAdmin(req,res,next){
//     if(req.user && req.user.isAdmin){
//         next();
//     }else{
//         return res.status(403).send({
//             error:"Forbidden"
//         });
//     }
// }

// module.exports = {verifyToken,isAdmin};



const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secret"); // Ensure "secret" is stored securely (e.g., in an environment variable)
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ error: "Forbidden. Admin access required." });
    }
}

module.exports = { verifyToken, isAdmin };
