import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import ExplorerService from "./services/Explorer";
import ExplorerController from "./controllers/ExplorerController";
import Explorer from "./services/Explorer";
import Users from "./entity/Users";

const app = express();
const port = 3000;

//Middlewares
app.use(express.json());

function handlePostConnectionSetup() {
  //Routes
  app.use("/explorer", ExplorerController);

  console.log("Listening at port " + port);
}

function generateDummyRecords() {
  [
    { id: 1, name: "File1", type: "file", parent: null },
    { id: 2, name: "Folder1", type: "folder", parent: null },
    { id: 3, name: "File2", type: "file", parent: 2 },
    { id: 4, name: "Folder2", type: "folder", parent: 2 },
    { id: 5, name: "File4", type: "file", parent: 4 },
    { id: 6, name: "File5", type: "file", parent: 4 },
    { id: 7, name: "File6", type: "file", parent: 4 },
  ].map((content) => {
    ExplorerService.save(content);
  });
}

createConnection({
  type: "postgres",

  // We need add the extra SSL to use heroku on localhost
  extra: {
    ssl: true,
  },

  // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
  url:
    "postgres://rrdgqdkfmlhyrh:e9e82ce628dbd623c5da651cbd65f31e1281d539781d0848d50206daad4e757d@ec2-23-20-20-150.compute-1.amazonaws.com:5432/d7vv081khdggd7",

  entities: ["dist/entity/*.js"],
  synchronize: true,
})
  .then(async (connection) => {
    await connection.query("PRAGMA foreign_keys=OFF;");
    await connection.runMigrations();
    await connection.query("PRAGMA foreign_keys=ON;");
    app.listen(port, handlePostConnectionSetup);
    generateDummyRecords();
  })
  .catch((error) => console.log("Error: ", error));
