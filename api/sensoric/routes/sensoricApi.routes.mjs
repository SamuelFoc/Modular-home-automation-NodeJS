import { Router } from "express";
import { recordSensoricData } from "../controllers/sensoric.controller.mjs";

const router = Router();

router.post("/:sID", recordSensoricData);

export default router;
