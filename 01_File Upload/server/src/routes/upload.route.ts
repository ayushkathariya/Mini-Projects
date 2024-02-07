import express from "express";
import { uploadFileController } from "../controllers/upload.controller";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFileController);

export default router;
