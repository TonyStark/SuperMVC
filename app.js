const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const browserSync = require("browser-sync");
const cors = require("cors");
const connectDB = require("./configs/database");
connectDB()

const SERVER_PORT = process.env.SERVER_PORT || 5501;
const BROWSERSYNC_PORT = process.env.BROWSERSYNC_PORT || 3001;

// ExpressJS Power
const app = express();
app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


// Morgan setup-START //////////////////////////
const skipFunction = (req, res) => {
  const extension = req.path.split(".").pop(); // Get the file extension from the request path
  return ["jpg", "js", "css", "png", "ttf"].includes(extension); // Return true to skip logging for these extensions
};
app.use(
  morgan("tiny", {      // Use "dev" for detailed logging
    skip: skipFunction,
  })
);
// Morgan setup-END //////////////////////////

const projectRoutes = require("./routes/projectRoutes");
app.use("/", projectRoutes);



// BrowserSync setup-START //////////////////////////
if (process.env.NODE_ENV === "development") {
  const bs = browserSync.create();
  bs.init({
    proxy: `http://localhost:${SERVER_PORT}`, // Proxy requests to Express server
    port: BROWSERSYNC_PORT, // Specify port for BrowserSync
    ui: false, // Disable BrowserSync UI
    files: ['**/*.ejs', '**/*.css', '**/*.js'], // Files to watch
    injectChanges: true, // Inject CSS changes directly (optional)
    notify: false,
    ghostMode: false,
    open: false,
  });
}
// BrowserSync setup-END //////////////////////////


app.listen(SERVER_PORT,()=>{
  console.log("Server Started on PORT: " + SERVER_PORT);
});

