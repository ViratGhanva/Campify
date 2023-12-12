const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/Campify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/*useNewUrlParser,
useUnifiedTopology,
useFindAndModify,
useCreateIndex,
are no longer supported options. 
Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true , and useFindAndModify is false .*/

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '655cb0d4976e8c41ea8373e7',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "http://source.unsplash.com/collection/484351",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptatum accusamus architecto numquam, consequatur corrupti sapiente nesciunt atque animi? Numquam cum placeat est animi, error ipsum aliquam tenetur similique fuga!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
