const asyncHandler = require("express-async-handler");

const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc    Get all tickets by admin
// @route   GET /api/admin/tickets
// @access  Private
const getAllTickets = asyncHandler(async (req, res) => {
  let filter = {};

  console.log(req.query);
  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.product) {
    filter.product = req.query.product;
  }

  const tickets = await Ticket.find(filter)
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json(tickets);
});

// @desc    Get a ticket by admin
// @route   GET /api/admin/tickets/:ticketId
// @access  Private
const getAdminTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId).populate(
    "user",
    "name email",
  );

  res.status(200).json(ticket);
});

// @desc    Get a ticket by admin
// @route   PUT /api/admin/tickets/:ticketId
// @access  Private
const openTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    { status: "opened" },
    { returnDocument: "after" },
  ).populate("user", "name email");

  res.status(200).json(ticket);
});

// @desc    Get a ticket by admin
// @route   POST /api/admin/tickets/:ticketId/notes
// @access  Private
const addAdminNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  const note = await Note.create({
    user: ticket.user._id,
    ticket: req.params.ticketId,
    isStaff: true,
    text: req.body.text,
  });

  res.status(200).json(note);
});

module.exports = { getAllTickets, getAdminTicket, openTicket, addAdminNote };
