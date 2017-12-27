var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds,});
        }
    });
});


router.post("/", middleware.isLoggedin, function(req, res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, price: price, img: image, description: description, author: author};
   Campground.create(newCampground, function(err, newlyCampground){
       if(err){
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
   });
});


router.get("/new", middleware.isLoggedin, function(req, res){
    res.render("campgrounds/new");
});


router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, found){
        if(err){
            console.log("Error!");
        } else{
            res.render("campgrounds/show", {campground: found});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwner, function(req, res){
        Campground.findById(req.params.id, function(err, found){
                res.render("campgrounds/edit", {campground: found});
        })
}); 

router.put("/:id", middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

router.delete("/:id", middleware.checkCampgroundOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})



module.exports = router;