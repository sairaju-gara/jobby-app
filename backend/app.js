const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

const jobRoute = require("./routes/jobRoute");
const skillRoute = require("./routes/skillRoute");
const companyRoute = require("./routes/companyRoute");
const userRoute = require("./routes/userRoute");

dotEnv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://jobby-app-n8zj.vercel.app",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongoDB successfully"))
  .catch((error) => console.log(error));
app.use("/jobbyapp", userRoute);
app.use("/jobs", jobRoute);
app.use("/skill", skillRoute);
app.use("/company", companyRoute);
app.listen(PORT, () => console.log(`Server starts at ${PORT}`));
