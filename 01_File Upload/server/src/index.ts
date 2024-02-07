import expres from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoute from "./routes/upload.route";
import { cloudinaryConfig } from "./utils/cloudinary";

const app = expres();

/* Configuration */
dotenv.config();
cloudinaryConfig();

// Middlewares
app.use(expres.json());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);

/* Routes */
app.use("/api", uploadRoute);
app.get("/", (req, res) => {
  return res.json({
    message: "Hello from server",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
