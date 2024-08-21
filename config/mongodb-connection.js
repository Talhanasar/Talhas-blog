const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>console.log("DB Connected!"))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


module.exports = mongoose.connection;
