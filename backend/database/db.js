const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const mongo_url = process.env.MONGODB_URL;
const connect = async () => {
 await mongoose
    .connect(mongo_url)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connect;
