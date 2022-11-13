const Station = require("../models/station");

async function getAllStations() {
  try {
    const stations = await Station.find({});
    return {
      success: true,
      data: stations,
    };
  } catch (err) {
    return { success: false, message: "Stations not found" };
  }
}

async function getStationById(id) {
  let station;
  try {
    station = await Station.findById(id);
    if (station == null) {
      return { success: false, message: "Cannot find station" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }

  return {
    success: true,
    data: station,
  };
}

async function addStation(body) {
  const station = new Station(body);

  try {
    const newStation = await station.save();
    return {
      success: true,
      data: newStation,
    };
  } catch (err) {
    return { success: false, message: "Failed to add catachphrase" };
  }
}

async function updateStation(
  id,
  movieName = null,
  reqStation = null,
  movieContext = null
) {
  let station;
  try {
    station = await Station.findById(id);
    if (station == null) {
      return { success: false, message: "Cannot find station" };
    }
    if (movieName != null) {
      station.movieName = movieName;
    }
    if (reqStation != null) {
      station.station = reqStation;
    }
    if (movieContext != null) {
      station.movieContext = movieContext;
    }

    try {
      const updatedStation = await station.save();
      return {
        success: true,
        data: updatedStation,
        message: "Station updated successfully",
      };
    } catch (err) {
      return { sucess: false, message: "Failed to update catachphrase" };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function removeStation(id) {
  let station;
  try {
    station = await Station.findById(id);
    if (station == null) {
      return { success: false, message: "Cannot find station" };
    }

    try {
      await station.remove();
      return {
        success: true,
        message: "Deleted Station",
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getAllStations,
  getStationById,
  addStation,
  updateStation,
  removeStation,
};
