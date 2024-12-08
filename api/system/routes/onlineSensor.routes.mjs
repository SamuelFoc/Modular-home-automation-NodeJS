import { Router } from "express";
import {
  createSensor,
  deleteSensor,
  getAllSensors,
  getSensorById,
  updateSensor,
} from "../controllers/onlineSensor.controller.mjs";

const router = Router();

router.post("/", createSensor);
router.get("/", getAllSensors);
router.get("/:sID", getSensorById);
router.put("/:sID", updateSensor);
router.delete("/:sID", deleteSensor);

export default router;
