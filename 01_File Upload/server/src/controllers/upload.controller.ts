import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!email || !file) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const cloudinaryFile = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });

    return res.status(201).json({
      message: "File uploaded successfully",
      file: cloudinaryFile.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
