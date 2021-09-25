import express from "express"
import * as waypointController from "./waypoint.controller"

export const waypointRouter = express.Router()

waypointRouter
  .route("/")
  .get(waypointController.getAllWaypoints)
  .post(waypointController.createWaypoint)

waypointRouter
  .route("/trip/:tripId")
  .get(waypointController.getWaypointsByTrip)
  .delete(waypointController.deleteWaypointsByTrip)

waypointRouter.route("/batch").post(waypointController.createManyWaypoints)

waypointRouter
  .route("/:id")
  .get(waypointController.getWaypoint)
  .put(waypointController.updateWaypoint)
  .delete(waypointController.deleteWaypoint)
