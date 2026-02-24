import { Router } from "express";
import * as level1 from "../controllers/level1.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";                        

const router = Router();

router.get("/exercise1", asyncHandler(level1.exercise1));
router.get("/exercise2", asyncHandler(level1.exercise2));
router.get("/exercise3", asyncHandler(level1.exercise3));
router.get("/exercise4", asyncHandler(level1.exercise4));
router.get("/exercise5", asyncHandler(level1.exercise5));
router.get("/exercise6", asyncHandler(level1.exercise6));
router.get("/exercise7", asyncHandler(level1.exercise7));
router.get("/exercise8", asyncHandler(level1.exercise8));
router.get("/exercise9", asyncHandler(level1.exercise9));
router.get("/exercise10", asyncHandler(level1.exercise10));

export default router;
