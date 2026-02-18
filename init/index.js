const mongoose = require("mongoose");


const initData = require("./data.js");

const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/dreamstay');
}

main()
.then(() => {
    console.log("Connection Successfull");
})
.catch((err) => {
    console.log(err);
});


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner: '698f017d4511a8a6b5c1d09e'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();