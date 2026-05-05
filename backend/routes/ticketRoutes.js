const express = require("express");
const noteRouter = require("./noteRoutes");
const { protect } = require("../middleware/authMiddleware");
const {
  getTicket,
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const router = express.Router();

// Re-route into noteRouter
router.use("/:ticketId/notes", noteRouter);

router.route("/").post(protect, createTicket).get(protect, getTickets);

router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
