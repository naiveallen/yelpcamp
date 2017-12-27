var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    flash        = require("connect-flash"),
    passport     = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    User         = require("./models/user"),
    seedDB       = require("./seeds");
    
var campgroundRoutes = require("./routes/campground"),
    commentRoutes    = require("./routes/comment"),
    indexRoutes      = require("./routes/index");
    
console.log(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
//mongoose.connect("mongodb://Allen:920215@ds133597.mlab.com:33597/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); 
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "I love you",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});
