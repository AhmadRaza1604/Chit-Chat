// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "Ahmad";



  router.post('/signup', async (req, res) => {
  try {
    console.log('Starting signup process...');

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email address already in use' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a 6-digit pin
    // const verificationPin = Math.floor(100000 + Math.random() * 900000).toString();
    
    // newUser.verificationPin = verificationPin;
    // newUser.verificationPinCreatedAt=new Date();
    // await newUser.save();

    // const mailOptions = {
    //   from: '"TourToPK" <tourtopk.official@gmail.com>', // Replace with your email
    //   to: req.body.email,
    //   subject: 'TourToPK Email Verification',
    //   html: `Welcome ${req.body.name}<br> Your verification pin is: ${verificationPin}`,
    // };
    // await transporter.sendMail(mailOptions);
    console.log('Signup process completed successfully.');
    res.status(201).json({ message: 'User registered successfully!' });

    // res.json({ message: 'Verification pin sent. Check your email to verify.' });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.post('/request-reset-password', async (req, res) => {
//   try {
//     let user = await User.findOne({ email: req.body.email });

//     if (!user) {
//     user = await Partner.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).json({ message: 'Email not found' });
//     }}

//     // Generate a 6-digit pin for password reset
//     const verificationPin = Math.floor(100000 + Math.random() * 900000).toString();
    
//     user.verificationPin = verificationPin;
//     user.verificationPinCreatedAt=new Date();
//     await user.save();

//     const mailOptions = {
//       from: '"TourToPK" <tourtopk.official@gmail.com>', // Replace with your email
//       to: req.body.email,
//       subject: 'TourToPK Password Reset',
//       html: `Hello ${user.name},<br> Your password reset pin is: ${verificationPin}. Use this pin to reset your password.`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: 'Password reset pin sent. Check your email to reset your password.' });
//   } catch (error) {
//     console.error('Error during password reset request:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// router.post('/verify-pin', async (req, res) => {
//   try {
//     const enteredPin = req.body.pin;
    
//     let user = await User.findOne({ email: req.body.email });

//     if (!user) {
//     user = await Partner.findOne({ email: req.body.email });
//     if (!user) {
//     return res.status(400).json({ message: 'User not found' });
//     }}

//     if (user.verificationPin !== enteredPin) {
//       return res.status(401).json({ message: 'Incorrect verification pin' });
//     }

//     // Check if pin is expired
//     const currentTime = new Date();
//     const pinCreationTime = user.verificationPinCreatedAt; // Assume you have a field storing the pin creation time

//     // Set the expiration time to, for example, 10 minutes
//     const pinExpirationTime = new Date(pinCreationTime.getTime() + 5 * 60 * 1000);

//     if (currentTime > pinExpirationTime) {
//       // Pin has expired
//       user.verificationPin = null;
//       await user.save();
//       return res.status(401).json({ message: 'Verification pin has expired' });
//     }

//     user.isVerified = true;
//     user.verificationPin = null;
//     await user.save();

//     res.json({ message: 'Email verified successfully. Sign in now.' });

//   } catch (error) {
//     console.error('Error during pin verification:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });  
// router.post('/resend-pin', async (req, res) => {
//   try {
//     const userEmail = req.body.email;
//     let user = await User.findOne({ email: userEmail });

//     if (!user) {
//       user = await Partner.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }}

//     // Check if there is an existing unexpired pin


//     // Generate a new 6-digit pin
//     const newVerificationPin = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save the new pin and update the creation time
//     user.verificationPin = newVerificationPin;
//     user.verificationPinCreatedAt = new Date();
//     await user.save();

//     // Send the new pin to the user via email
//     const mailOptions = {
//       from: '"TourToPK" <tourtopk.official@gmail.com>',
//       to: userEmail,
//       subject: 'TourToPK Email Verification',
//       html: `Hello <br> Your new verification pin is: ${newVerificationPin}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: 'New verification pin sent. Check your email to verify.' });
//   } catch (error) {
//     console.error('Error during pin resend:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.post('/reset-password', async (req, res) => {
//     try {
//       let user = await User.findOne({ email: req.body.email });
  
//       if (!user) {
//         user = await Partner.findOne({ email: req.body.email });
//         if(!user){  
//         return res.status(400).json({ message: 'User not found' });}
//       }
  
//       // Update the password with the new one
//       const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
//       user.password = hashedPassword;
      
//       // Clear the reset pin
//       user.resetPin = null;
  
//       await user.save();
  
//       res.json({ message: 'Password reset successful. You can now login with your new password.' });
//     } catch (error) {
//       console.error('Error during password reset:', error.message);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
    
//   router.get('/count', async (req, res) => {
//     try {
//       const totalUsers = await User.countDocuments();
//       res.json({ count: totalUsers });
//     } catch (error) {
//       console.error('Error getting total users count:', error.message);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  

router.post('/login', async (req, res) => {
    try {
            let user; 
            user= await User.findOne({ email: req.body.email });
            
                  if(!user){
                    return res.status(401).json({ message: 'User not found!' });
                }
              
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect password!' });
            }
            // if(user.isVerified===false){
            //     return res.status(401).json({ message: 'User is not verified! Reset Password to verify.' });
            // }
            const token = jwt.sign({ userId: user._id, name: user.name, userEmail:user.email }, secretKey, {
                expiresIn: '30m',
            });
    
            res.json({ message: 'Login successful', token });
        
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
);


// Helper function to generate a random password
// function generateRandomPassword() {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
//   const passwordLength = 8;
//   let password = '';
//   for (let i = 0; i < passwordLength; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     password += characters.charAt(randomIndex);
//   }
//   return password;
// }



// router.get('/user/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById({_id:userId});
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user by ID:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Route to fetch all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching all users:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });



// router.delete("/delUser/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const singleUser = await User.findByIdAndDelete({
//       _id: id,
//     });

//     if (singleUser) {
//       const mailOptions = {
//         from: '"TourToPK" <tourtopk.official@gmail.com>',
//         to: singleUser.email,
//         subject: 'Account Deletion Notice',
//         html: `Hello ${singleUser.name},<br><br>Your account has been deleted due to violations of our terms of service.`,
//       };
//       await transporter.sendMail(mailOptions);
//     }

//     res.status(200).json(singleUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });


// router.patch("/userUpdate/:userId", upload.single("image"), async (req, res) => {
//   const userId = req.params.userId;
//   const {
//     name,
//     email,
//     cnic,
//     phone,
//     city,
//   } = req.body;

//   try {
//     // Fetch existing user data
//     const existingUser = await User.findById(userId);

//     // Update the user data
//     const updatedUserData = {
//       name: name,
//       email: email,
//       cnic: cnic,
//       phone: phone,
//       city: city,
//     };

//     // Handle image update
//     let updatedImage = existingUser.image;
//     if (req.file) {
//       // New image is provided, delete previous image from Cloudinary
//       if (existingUser.image) {
//         await cloudinary.uploader.destroy(getPublicId(existingUser.image));
//       }
//       // Upload new image to Cloudinary
//       const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     const cldRes = await handleUpload(dataURI);
//     updatedImage=cldRes.url;

//     }

//     // Update the user with new data
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         ...updatedUserData,
//         image: updatedImage,
//       },
//       { new: true }
//     );
    


//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });




module.exports = router;