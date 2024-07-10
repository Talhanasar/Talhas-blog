const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}/miniproject`)
.then().catch((err)=>{
    res.status(404).send(err.message);
});

module.exports = mongoose.connection;
