const express = require("express");
const connectDb = require("./config/db");
const { stations } = require("./routes/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Stations REST API",
      description:
        "A REST API built with Express and MongoDB. This API provides radio stations and the streaming url of the station.",
    },
  },
  apis: ["./routes/stations.js"],
};

app.use("/stations", stations);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));
