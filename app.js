if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");

const mongoose = require("mongoose");

const ejs = require("ejs");

const app = express();

const path = require("path");

const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}



main()
.then(() => {
    console.log("Connection Successfull");
})
.catch((err) => {
    console.log(err);
})

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "views"));
app.engine("ejs" , ejsMate);

app.use(express.static(path.join(__dirname , "/public")));

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));


const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret:  process.env.SECRET
    } ,
    touchAfter : 24* 3600,
})

store.on("error" , (err) => {
    console.log("ERROR IN MONGO STORE" ,err);
})
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 1000*60*60*7*24) ,
        maxAge: 1000*60*60*7*24,
        httpOnly: true
    } ,
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


// app.get("/" , (req,res) => {
//     res.send("Root is Working");
// })

// app.get("/demoUser" , async (req,res) =>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     })

//     let registerdUser = await User.register(fakeUser , "HelloWorld");
//     res.send(registerdUser);
// })

app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/" , userRouter);

// Error Handler

app.use((req,res,next) => {
    next(new ExpressError(404 , "Page not Found!"));
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.render("listings/error.ejs" , {err, message});
    
});

app.listen(8080 , () => {
    console.log("app is Listening to port 8080");
})