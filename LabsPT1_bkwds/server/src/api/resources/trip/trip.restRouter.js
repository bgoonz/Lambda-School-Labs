import express from "express"
import * as tripController from "./trip.controller"

export const tripRouter = express.Router()

tripRouter
  .route("/")
  .get(tripController.getAllTrips)
  .post(tripController.createTrip)

tripRouter.route("/repeat").post(tripController.repeatTrip)

tripRouter
  .route("/:id")
  .get(tripController.getOneTrip)
  .put(tripController.updateTrip)
  .delete(tripController.deleteTrip)

tripRouter.route("/:id/waypoints").get(tripController.populateWaypoints)

tripRouter.route("/upload/:id").put(tripController.uploadPics)
tripRouter.route("/pictures/:id").get(tripController.uploadPics)
