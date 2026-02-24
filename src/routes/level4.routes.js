import { Router } from "express";
import * as level4 from "../controllers/level4.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";                        

const router = Router();

router.get("/exercise31", asyncHandler(level4.exercise31));
router.get("/exercise32", asyncHandler(level4.exercise32));
router.get("/exercise33", asyncHandler(level4.exercise33));
router.get("/exercise34", asyncHandler(level4.exercise34));
router.get("/exercise35", asyncHandler(level4.exercise35));
router.get("/exercise36", asyncHandler(level4.exercise36));
router.get("/exercise37", asyncHandler(level4.exercise37));
router.get("/exercise38", asyncHandler(level4.exercise38));
router.get("/exercise39", asyncHandler(level4.exercise39));
router.get("/exercise40", asyncHandler(level4.exercise40));


export default router;
