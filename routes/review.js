const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review =  require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , validateReview , isReviewAuthor} = require("../middlewares.js");

const reviewController = require("../controllers/reviews.js");



// Reviews
// Post Route for reviews
router.post("/" ,isLoggedIn,
    validateReview ,
    wrapAsync(reviewController.createReview));

// Delete Route
router.delete("/:reviewId" ,
    isLoggedIn,
    isReviewAuthor, 
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;