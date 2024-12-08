import express from "express";
import {
  createGpio,
  getAllGpios,
  getGpioById,
  updateGpio,
  deleteGpio,
  associateGpioWithSensor,
} from "../controllers/gpio.controller.mjs";

const router = express.Router();

router.post("/", createGpio);
router.post("/:id/associate", associateGpioWithSensor);
router.get("/", getAllGpios);
router.get("/:id", getGpioById);
router.put("/:id", updateGpio);
router.delete("/:id", deleteGpio);

export default router;
