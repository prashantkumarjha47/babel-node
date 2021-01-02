import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import ExplorerService from "./services/Explorer";
import ExplorerController from "./controllers/ExplorerController";

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

createConnection()
  .then((connection) => {
    app.listen(port, handlePostConnectionSetup);
    generateDummyRecords();
  })
  .catch((error) => console.log("Error: ", error));
