const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}/miniproject`)
.then().catch((err)=>{
    console.log(`${err.message} - in mongodb-connection`);
});

module.exports = mongoose.connection;
