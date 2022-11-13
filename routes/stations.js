const express = require("express");
const router = express.Router();
let {
  getAllStations,
  getStationById,
  addStation,
  updateStation,
  removeStation,
} = require("../controllers/stationController");

/**
 * @swagger
 * /stations:
 *   get:
 *     description: All stations
 *     responses:
 *       200:
 *         description: Returns all the stations
 */
router.get("/", async (req, res) => {
  let response = await getAllStations();
  if (response.success == true) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The station ID.
 *     description: Get a station by id
 *     responses:
 *       200:
 *         description: Returns the requested catachphrase
 */
router.get("/:id", async (req, res) => {
  let response = await getStationById(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /stations:
 *   post:
 *     parameters:
 *      - in: body
 *        name: station
 *        description: New station
 *        schema:
 *          type: object
 *          properties:
 *            stationName:
 *              type: string
 *            stationURL:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", async (req, res) => {
  let body = {
    stationName: req.body.stationName,
    stationURL: req.body.stationURL,
  };
  let response = await addStation(body);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /stations/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The station ID.
 *      - in: body
 *        name: station
 *        description: Update station
 *        schema:
 *          type: object
 *          properties:
 *            stationName:
 *              type: string
 *            stationURL:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.put("/:id", async (req, res) => {
  let stationName = null,
    stationURL = null;
  if (req.body.stationName) {
    stationName = req.body.stationName;
  }
  if (req.body.stationURL) {
    stationURL = req.body.stationURL;
  }
  let response = await updateStation(req.params.id, stationName, stationURL);

  if (response.success == true) {
    res.status(201).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The station ID.
 *     description: Delete a station by id
 *     responses:
 *       200:
 *         description: Returns the requested catachphrase
 */
router.delete("/:id", async (req, res) => {
  let response = await removeStation(req.params.id);
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(response);
  }
});

module.exports = router;
