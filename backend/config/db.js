const mongoose = require("mongoose");
const MONGO_URI ="mongodb+srv://akhiljoseph:akhiljoseph@cluster0.iqgkrg9.mongodb.net/MERNCHAT?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
