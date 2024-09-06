const mongoose = require("mongoose");

async function main () {
    try {
        await mongoose.connect("mongodb+srv://leogeneroso1692:C4FfLKC7gwjfPdLA@cluster0.yvfiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected!");
    } catch (error) {
        console.log(`Error: ${error}`);   
    }
}

module.exports = main;