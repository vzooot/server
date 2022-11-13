const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  stationName: {
    type: String,
  },
  stationURL: {
    type: String,
  },
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
