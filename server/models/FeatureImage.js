// server/models/FeatureImage.js
const mongoose = require('mongoose');

const featureImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  // You can add other fields such as user or product associations here
});

const FeatureImage = mongoose.model('FeatureImage', featureImageSchema);
module.exports = FeatureImage;
