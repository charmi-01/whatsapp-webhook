const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB() {
  try {
      const dbURI = process.env.DATABASE_URL_2
    //   console.log('dburl: ', dbURI);

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to Database...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = connectToMongoDB;
