// const {model}=require("mongoose");
// const User = require("./../db/user");
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
// const axios = require('axios');

// async function registerUser(model) {
//     // Verify reCAPTCHA token
//     const recaptchaSecretKey = '6LfXBEgqAAAAAL-NDkcfN9KtyFfeREjyUVmx1wTZ';
//     const recaptchaResponse = model.recaptcha;

//     try {
//         const recaptchaVerification = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
//             params: {
//                 secret: recaptchaSecretKey,
//                 response: recaptchaResponse,
//             },
//         });

//         // Check if the reCAPTCHA was successful
//         if (recaptchaVerification.data.success) {
//             // Hash the password and create the user
//             const hashPassword = await bcrypt.hash(model.password, 10);
//             let user = new User({
//                 name: model.name,
//                 email: model.email,
//                 password: hashPassword,
//             });
//             await user.save();

//             return { success: true, message: 'User registered successfully' };
//         } else {
//             return { success: false, message: 'reCAPTCHA verification failed' };
//         }
//     } catch (error) {
//         console.error('Error during reCAPTCHA verification:', error);
//         return { success: false, message: 'reCAPTCHA verification error' };
//     }
// }


// async function loginUser(model){
//     const user = await User.findOne({email:model.email});
//     if(!user){
//         return null;
//     }
//     const isMatched = await bcrypt.compare(model.password,user.password);
//     if(isMatched){
//         //login
//         const token = jwt.sign(
//             {
//                 id:user._id,
//                 name:user.name,
//                 email:user.email,
//                 isAdmin:user.isAdmin,
//             },
//             "secret",
//             {
//                 expiresIn:"1h",
//             }
         
//         );
//         return {token ,user};
//     }else{
//         return null;
//     }

// }

// module.exports = {registerUser,loginUser};


const User = require("./../db/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Environment variables should be used for sensitive data
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET || '6LfXBEgqAAAAAL-NDkcfN9KtyFfeREjyUVmx1wTZ';
const jwtSecret = process.env.JWT_SECRET || 'secret';
const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

async function registerUser(model) {
    try {
        // Input validation
        if (!model.name || !model.email || !model.password || !model.recaptcha) {
            return { success: false, message: 'All fields are required' };
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: model.email });
        if (existingUser) {
            return { success: false, message: 'Email already registered' };
        }

        // Verify reCAPTCHA token
        const recaptchaVerification = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: recaptchaSecretKey,
                    response: model.recaptcha,
                },
            }
        );

        if (!recaptchaVerification.data.success) {
            return { success: false, message: 'reCAPTCHA verification failed' };
        }

        // Hash the password and create the user
        const hashPassword = await bcrypt.hash(model.password, 10);
        const user = new User({
            name: model.name,
            email: model.email,
            password: hashPassword,
        });

        await user.save();

        return { 
            success: true, 
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        };

    } catch (error) {
        console.error('Registration error:', error);
        return { 
            success: false, 
            message: error.message || 'Registration failed' 
        };
    }
}

async function loginUser(model) {
    try {
        // Input validation
        if (!model.email || !model.password) {
            return { success: false, message: 'Email and password are required' };
        }

        const user = await User.findOne({ email: model.email });
        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }

        const isMatched = await bcrypt.compare(model.password, user.password);
        if (!isMatched) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            jwtSecret,
            {
                expiresIn: "1h",
            }
        );

        return {
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        };

    } catch (error) {
        console.error('Login error:', error);
        return { 
            success: false, 
            message: error.message || 'Login failed' 
        };
    }
}

async function forgotPassword(email) {
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return { success: true, message: 'If the email exists, a reset link has been sent' };
        }

        // Generate token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport(emailConfig);

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password/${token}`;
        
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset for your account.</p>
                <p>Click this link to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Password reset email sent' };

    } catch (error) {
        console.error('Forgot password error:', error);
        return { 
            success: false, 
            message: error.message || 'Error processing password reset' 
        };
    }
}

async function resetPassword(token, newPassword) {
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return { success: false, message: 'Invalid or expired token' };
        }

        // Update password and clear token
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        return { success: true, message: 'Password has been reset successfully' };

    } catch (error) {
        console.error('Reset password error:', error);
        return { 
            success: false, 
            message: error.message || 'Error resetting password' 
        };
    }
}

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};