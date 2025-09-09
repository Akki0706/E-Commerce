// const express = require("express");
// const { registerUser, loginUser } = require("../handlers/auth-handler");
// const User = require("../db/user");
// const router=express.Router();
// const crypto = require("crypto")
// const nodemailer = require("nodemailer")
// router.post("/register", async(req,res)=>{
//     let model = req.body;
//     if(model.name && model.email && model.password){
//         //todo register
//         await registerUser(model);
//         res.send({
//             message:"User Registered Successfully",
//         })
//     }else{
//         res.status(400).json({
//             error:"Please provide name,email and password",
//         });
//     }
// })

// router.post("/login", async(req,res)=>{
//     let model = req.body;
//     if( model.email && model.password){
//         const result = await loginUser(model);
//         if(result){
//             res.send(result);
//         }else{
//             res.status(400).json({
//                 error:"Email or password is incorrect",
//             })
//         }
//     }else{
//         res.status(400).json({
//             error:"Please provide email and password",
//         });
//     }
// })


// // Forgot password route
// router.post('/forgot-password', async (req, res) => {
//     console.log("forget password hit")
//     console.log("request body : " , req.body);
    
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate token
//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
//     await user.save();

//     // Send email
//  const transporter = nodemailer.createTransport({
//   service: 'Gmail',  
//   auth: {
//     user: process.env.USER_EMAIL,  
//     pass: process.env.EMAIL_PASS   
//   }
// });
//     const mailOptions = {
//       to: user.email,
//       from: 'akki65015@gmail.com',
//       subject: 'Password Reset',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         http://${req.headers.host}/reset-password/${token}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Reset password route
// router.post('/reset-password/:token', async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
    
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
//     }

//     // Update password and clear token
//     user.password = password; // Make sure to hash this before saving in production
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
    
//     await user.save();

//     res.status(200).json({ message: 'Password has been updated' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports=router;


const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const User = require("../db/user");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


// Register route
router.post("/register", async (req, res) => {
    let model = req.body;
    if (model.name && model.email && model.password) {
        try {
            await registerUser(model);
            res.send({
                message: "User Registered Successfully",
            });
        } catch (error) {
            res.status(500).json({
                error: "Registration failed",
                details: error.message
            });
        }
    } else {
        res.status(400).json({
            error: "Please provide name, email and password",
        });
    }
});

// Login route
router.post("/login", async (req, res) => {
    let model = req.body;
    if (model.email && model.password) {
        try {
            const result = await loginUser(model);
            if (result) {
                res.send(result);
            } else {
                res.status(400).json({
                    error: "Email or password is incorrect",
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Login failed",
                details: error.message
            });
        }
    } else {
        res.status(400).json({
            error: "Please provide email and password",
        });
    }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(200).json({ 
                message: 'If this email is registered, you will receive a password reset link' 
            });
        }

        // Generate token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Email transporter configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Use your Angular frontend URL here
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
        const resetUrl = `${frontendUrl}/reset-password/${token}`;
        
        const mailOptions = {
            to: user.email,
            from: `"DesiDealz" <${process.env.USER_EMAIL}>`,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Password Reset Request</h2>
                    <p>You requested a password reset for your account.</p>
                    <p>Click the button below to reset your password:</p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent successfully' });
        
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ 
            message: 'An error occurred while processing your request',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get('/verify-reset-token/:token', async (req, res) => {
    try {
        const token = decodeURIComponent(req.params.token);
        console.log(`Verifying token: ${token}`);
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        }).select('email resetPasswordToken resetPasswordExpires');

        if (!user) {
            console.log('Invalid or expired token');
            return res.status(400).json({ 
                valid: false,
                message: 'Password reset token is invalid or has expired' 
            });
        }

        console.log(`Token valid for user: ${user.email}`);
        res.status(200).json({ 
            valid: true,
            email: user.email 
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ 
            valid: false,
            message: 'Error verifying token' 
        });
    }
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
    try {
        const token = decodeURIComponent(req.params.token);
        const { password } = req.body;
        
        console.log(`Password reset request for token: ${token}`);
        
        if (!password || password.length < 6) {
            return res.status(400).json({ 
                message: 'Password is required and must be at least 6 characters' 
            });
        }
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                message: 'Password reset token is invalid or has expired' 
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update password and clear token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        console.log(`Password reset successful for user: ${user.email}`);
        res.status(200).json({ 
            message: 'Password has been updated successfully' 
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ 
            message: 'An error occurred while resetting your password' 
        });
    }
});





module.exports = router;