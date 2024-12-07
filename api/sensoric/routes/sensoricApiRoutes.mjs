import { Router } from "express";
import { recordSensoricData } from "../controllers/sensoricControllers.mjs";

const router = Router();

router.post("/:sID", recordSensoricData);

export default router;
