import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        productID: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        disLikes: {
            type: Number,
            default: 0,
        }
    }
);

export const Comments = mongoose.model('comments', commentSchema);



// _id
// :
// "1001265"
// listing_url
// :
// "https://www.airbnb.com/rooms/1001265"
// name
// :
// "Ocean View Waikiki Marina w/prkg"
// summary
// :
// "A short distance from Honolulu's billion dollar mall, and the same dis..."
// space
// :
// "Great studio located on Ala Moana across the street from Yacht Harbor ..."
// description
// :
// "A short distance from Honolulu's billion dollar mall, and the same dis..."
// neighborhood_overview
// :
// "You can breath ocean as well as aloha."
// notes
// :
// ""
// transit
// :
// "Honolulu does have a very good air conditioned bus system."
// access
// :
// "Pool, hot tub and tennis"
// interaction
// :
// "We try our best at creating, simple responsive management which never ..."
// house_rules
// :
// "The general welfare and well being of all the community."
// property_type
// :
// "Condominium"
// room_type
// :
// "Entire home/apt"
// bed_type
// :
// "Real Bed"
// minimum_nights
// :
// "3"
// maximum_nights
// :
// "365"
// cancellation_policy
// :
// "strict_14_with_grace_period"
// last_scraped
// :
// 2019-03-06T05:00:00.000+00:00
// calendar_last_scraped
// :
// 2019-03-06T05:00:00.000+00:00
// first_review
// :
// 2013-05-24T04:00:00.000+00:00
// last_review
// :
// 2019-02-07T05:00:00.000+00:00
// accommodates
// :
// 2
// bedrooms
// :
// 1
// beds
// :
// 1
// number_of_reviews
// :
// 96
// bathrooms
// :
// 1.0
// amenities
// :
// Array
// price
// :
// 115.00
// weekly_price
// :
// 650.00
// monthly_price
// :
// 2150.00
// cleaning_fee
// :
// 100.00
// extra_people
// :
// 0.00
// guests_included
// :
// 1
// images
// :
// Object
// host
// :
// Object
// address
// :
// Object
// availability
// :
// Object
// review_scores
// :
// Object
// reviews
// :
// Array