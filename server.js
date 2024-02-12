const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const session = require('express-session');
const fs=require("fs/promises")
const express=require("express")
const app=express()


app.get("/hello",(req,res)=>{
  res.json({
    message:"hello user"
  })
})

// Trigger Google OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google has authenticated the user
app.get('/auth/google/callback', 
  
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home or to another page
    res.redirect('/');
  });


  app.use(session({
    secret: 'secret', // Replace with your session secret
    resave: false,
    saveUninitialized: true,
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    // Here, you would either create a new user in your DB or update an existing user
    // You might want to connect to your database and perform operations like:
    try {
    
      //await connectToDB(); // Your database connection logic
      
      const user={
        _id:Math.random()*10000000000000,
        email:profile.emails[0].value
      }
      await addUser(user)
      return cb(null,user)
    } catch (error) {
      return cb(error, null);
    }
  }
));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, cb) => cb(null, user._id));
passport.deserializeUser((id, cb) => {
    findUser(id).then(user => cb(null,user))
});



app.listen(5000)
const data=getDb("users.json").then(data => console.log(data.data.length))
