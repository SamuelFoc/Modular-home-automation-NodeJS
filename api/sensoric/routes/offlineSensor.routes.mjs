import { Router } from "express";
import { readSensorsDataPin } from "../controllers/offlineSensor.controller.mjs";

const router = Router();

router.get("/:s_id", readSensorsDataPin);

export default router;
