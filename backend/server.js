import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config(); 
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 4000;

connectDB();

const app = express();

// Body parser middleware to parse the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware to parse the cookies from the request object
// alows to acces reqest.cookies and since  the cookie is called JWT we can access it by req.cookies.JWT
// we can do this in the authMiddleware.js file
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
