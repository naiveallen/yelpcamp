var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud",
        img:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?auto=format&fit=crop&w=750&q=80",
        description:"Boniface has been the name of eight popes, one antipope, and one saint, but none of those had anything (directly) to do with the English word boniface. The word boniface comes from the name of the jovial innkeeper in George Farquhar's 1707 play The Beaux' Strategem, the story of two penniless rakes who determine that one of them must find and marry a wealthy lady. Farquhar's play made more than one contribution to the English language. The name of the character Lady Bountiful is a byword for a generous (and often conspicuously so) philanthropist. Farquhar, incidentally, never got to see the influence his play had on the lexicon. He finished The Beaux' Strategem on his deathbed, and died on the night of its third performance."
    },
    {
        name: "Sun",
        img:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?auto=format&fit=crop&w=750&q=80",
        description:"Boniface has been the name of eight popes, one antipope, and one saint, but none of those had anything (directly) to do with the English word boniface. The word boniface comes from the name of the jovial innkeeper in George Farquhar's 1707 play The Beaux' Strategem, the story of two penniless rakes who determine that one of them must find and marry a wealthy lady. Farquhar's play made more than one contribution to the English language. The name of the character Lady Bountiful is a byword for a generous (and often conspicuously so) philanthropist. Farquhar, incidentally, never got to see the influence his play had on the lexicon. He finished The Beaux' Strategem on his deathbed, and died on the night of its third performance."
    },
    {
        name: "Moon",
        img:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=750&q=80",
        description:"Boniface has been the name of eight popes, one antipope, and one saint, but none of those had anything (directly) to do with the English word boniface. The word boniface comes from the name of the jovial innkeeper in George Farquhar's 1707 play The Beaux' Strategem, the story of two penniless rakes who determine that one of them must find and marry a wealthy lady. Farquhar's play made more than one contribution to the English language. The name of the character Lady Bountiful is a byword for a generous (and often conspicuously so) philanthropist. Farquhar, incidentally, never got to see the influence his play had on the lexicon. He finished The Beaux' Strategem on his deathbed, and died on the night of its third performance."
    }
];

function seedDB(){
    //remove
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("campground remove");
            //create
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Add a campground");
                        Comment.create({
                            text: "This place is great, but I wish there was internet.",
                            author: "Kobe"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("add a comment");
                            } 
                        })
                    }
                });
            });
        }
     });
 
}

module.exports = seedDB;






