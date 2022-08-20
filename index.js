import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./src/routes/user.js";
import itemRouter from "./src/routes/items.js"
import userprofileRouter from "./src/routes/userprofile.js"
import cors from 'cors'
import userprofile from "./src/services/userprofile.js";
import useradressRouter from"./src/routes/adress.js";
import wishlistRouter from "./src/routes/wishlist.js"
import groupRouter from "./src/routes/groups.js"




const router = express.Router();


dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});




// Link router to app
//app.use('/courses', router);

app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/userprofile", userprofileRouter);
app.use("/adress", useradressRouter)
app.use("/wishlists", wishlistRouter)
app.use ("/groups", groupRouter)






//app.use(errorsMiddleware);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});