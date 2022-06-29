import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import postRoute from "./Routes/posts.js"
import userRoute from "./Routes/users.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoute)
app.use('/users', userRoute)

mongoose.connect(process.env.CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on port: ${process.env.PORT}`)))
    .catch((error) => console.log(error.message));

