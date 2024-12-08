import { Router } from "express";
import { recordSensoricData } from "../controllers/data.controller.mjs";

const router = Router();

router.post("/:sID", recordSensoricData);

export default router;
