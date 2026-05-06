const express = require("express");
const path = require("path");
const cors = require("cors");
require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// CONNECT DB
connectDB();
const app = express();
const PORT = process.env.PORT || 8000;

// USE CORS MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if you're using sessions/auth
  }),
);

// IMPORTING VARIOUS ROUTES
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CONNECTING OUR BACKEND ROUTES
app.use("/api/user", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

// SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React/Vite build output
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // For any route not caught by the API, serve the React app
  app.get("/{*path}", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
  );
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to Support Desk App" });
  });
}

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`.yellow.bold.underline),
);
