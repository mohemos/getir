import { Router } from "express";
import { joiValidator } from "iyasunday";
import { getRecord } from "./controller";
import validation from "./validation";

const router = Router();

router.post("/", joiValidator(validation.getRecord), getRecord);

export default router;
