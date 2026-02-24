import { Router } from "express";
import * as level2 from "../controllers/level2.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";                        

const router = Router();

router.get("/exercise11", asyncHandler(level2.exercise11));
router.get("/exercise12", asyncHandler(level2.exercise12));
router.get("/exercise13", asyncHandler(level2.exercise13));
router.get("/exercise14", asyncHandler(level2.exercise14));
router.get("/exercise15", asyncHandler(level2.exercise15));
router.get("/exercise16", asyncHandler(level2.exercise16));
router.get("/exercise17", asyncHandler(level2.exercise17));
router.get("/exercise18", asyncHandler(level2.exercise18));
router.get("/exercise19", asyncHandler(level2.exercise19));
router.get("/exercise20", asyncHandler(level2.exercise20));

export default router;
