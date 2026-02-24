import { Router } from "express";
import * as level3 from "../controllers/level3.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";                        

const router = Router();

router.get("/exercise21", asyncHandler(level3.exercise21));
router.get("/exercise22", asyncHandler(level3.exercise22));
router.get("/exercise23", asyncHandler(level3.exercise23));
router.get("/exercise24", asyncHandler(level3.exercise24));
router.get("/exercise25", asyncHandler(level3.exercise25));
router.get("/exercise26", asyncHandler(level3.exercise26));
router.get("/exercise27", asyncHandler(level3.exercise27));
router.get("/exercise28", asyncHandler(level3.exercise28));
router.get("/exercise29", asyncHandler(level3.exercise29));
router.get("/exercise30", asyncHandler(level3.exercise30));


export default router;
