import express from "express";
import { allBookings, allFav, bookVisit, cancelBooking, createUser, toFav } from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router=express.Router()

router.post("/register", jwtCheck, createUser); //when someone is registering first he has to pass jwtCheck middleware, if he passes then we craete a user else we simply return

router.post("/bookVisit/:id", jwtCheck, bookVisit)

router.post("/allBookings", allBookings)

router.post("/cancelBooking/:id", jwtCheck, cancelBooking)

router.post("/toFav/:rid", jwtCheck, toFav)

router.post("/allFav", jwtCheck, allFav)

export { router as userRoute}