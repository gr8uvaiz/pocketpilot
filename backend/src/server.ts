import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());


app.use("/api", router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
