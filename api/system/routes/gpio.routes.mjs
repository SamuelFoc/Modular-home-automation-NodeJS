import express from "express";
import {
  createGpio,
  getAllGpios,
  getGpioById,
  updateGpio,
  deleteGpio,
  associateGpioWithSensor,
  turnOnOff,
  readGpio,
} from "../controllers/gpio.controller.mjs";

const router = express.Router();

router.post("/", createGpio);
router.get("/", getAllGpios);
router.get("/:id", getGpioById);
router.put("/:id", updateGpio);
router.delete("/:id", deleteGpio);
router.post("/associate", associateGpioWithSensor);
router.post("/switch/:id", turnOnOff);
router.get("/read/:id", readGpio);

export default router;
