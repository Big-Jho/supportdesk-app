const express = require("express");
const { isAdminCheck } = require("../middleware/adminMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllTickets,
  getAdminTicket,
  getAdminNotes,
  openTicket,
  addAdminNote,
} = require("../controllers/adminTicketController");

const router = express.Router();

router.route("/tickets").get(protect, isAdminCheck, getAllTickets);
router
  .route("/tickets/:ticketId")
  .get(protect, isAdminCheck, getAdminTicket)
  .put(protect, isAdminCheck, openTicket);

router
  .route("/tickets/:ticketId/notes")
  .get(protect, isAdminCheck, getAdminNotes)
  .post(protect, isAdminCheck, addAdminNote);

module.exports = router;
