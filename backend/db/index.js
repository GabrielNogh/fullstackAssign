const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// to make code look a sync even though he is sync -> use async await
const connectDB = async () => {
  // if there's error on connect - show failed message ( needed in async)
  try {
    await mongoose.connect(db);
    console.log('MongoDB successfuly connected...');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
