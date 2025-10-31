const mongoose = require("mongoose");

class MongoDB {
  static connect = async (uri) => {
    if (this.connection) return this.connection;

    try {
      this.connection = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return this.connection;
    } catch (error) {
      process.exit(1);
    }
  };
}
module.exports = MongoDB;
