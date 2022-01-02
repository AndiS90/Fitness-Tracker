const express = require("express");
const logger = require("morgan"); //to log responses to the console for easier debugging
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev")); //sets morgan to developer mode

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

app.use(require("./routes/api.js"));

app.use(require("./routes/homeRoutes.js"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", {
    useNewUrlParser: true, // since MDB driver deprecated their connection string parser, this flag allows use of old parser
    useFindAndModify: false, //Set to false to make findOneAndUpdate() and findOneAndRemove() possible to use
    useUnifiedTopology: true, //opt in to using the MongoDB driver's new connection management engine. make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings


});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});