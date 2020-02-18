const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//  News schema and model for all categories
const newsSchema = new Schema({
    headline: {
        type: String,
        required: [true, 'headline field is required']
    },
    authors: {
        type: String,
        required: [true, 'authors field is required']
    },
    description: {
        type: String,
        required: [true, 'description field is required']
    },
    date: {
        type: String,
        required: [true, 'date field is required']
    }
});

const sports = mongoose.model('sports', newsSchema);
const politics = mongoose.model('politics', newsSchema);
const businesses = mongoose.model('businesses', newsSchema);


//  Exporting models
module.exports = {
    sports: sports,
    politics: politics,
    businesses: businesses
}