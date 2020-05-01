const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const fileUpload = require("express-fileupload");

const userRouter = require("./routes/userRoutes");
const companyRouter = require("./routes/companyRoutes");
const activityRouter = require("./routes/activityRoutes");
const activityLogRouter = require("./routes/activityLogRoutes");
const EmailRouter = require("./routes/emailRoutes");

var path = require("path");

const app = express();

// const DB = process.env.DATABASE.replace(
// "<PASSWORD>",
// process.env.DATABASE_PASSWORD
// );
const DB = "mongodb://localhost:27017";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"));

// *********************GLOBAL MIDDLEWARES*******************************
app.use(fileUpload());
//set security http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit request from same IP
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));

//Data sanitization against Nosql query injections
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

//Prevent Paramter Pollution
app.use(
  hpp({
    // whitelist: [
    //   "duration",
    //   "ratingsQuantity",
    //   "ratingsAverage",
    //   "maxGroupSize",
    //   "difficulty",
    //   "price"
    // ]
  })
);

app.use(compression());

//***************************/ROUTES***********************************

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/activity", activityRouter);
app.use("/api/activityLog", activityLogRouter);
app.use("/api/email", EmailRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
