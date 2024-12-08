import express from "express";
import {
  createOfflineSensor,
  getAllOfflineSensors,
  getOfflineSensorById,
  updateOfflineSensor,
  deleteOfflineSensor,
} from "../controllers/offlineSensor.controller.mjs";

const router = express.Router();

router.post("/", createOfflineSensor);
router.get("/", getAllOfflineSensors);
router.get("/:s_id", getOfflineSensorById);
router.put("/:s_id", updateOfflineSensor);
router.delete("/:s_id", deleteOfflineSensor);

export default router;
