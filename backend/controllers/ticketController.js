const asyncHandler = require("express-async-handler");

const Ticket = require("../models/ticketModel");

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { description, product } = req.body;

  if (!description || !product) {
    res.status(400);
    throw new Error("Please add description and product");
  }

  const newTicket = await Ticket.create({
    product,
    description,
    status: "new",
    user: req.user.id,
  });

  res.status(201).json(newTicket);
});

// @desc    Get user Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get ticket by id
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

// @desc    Update Ticket by id
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" },
  );

  res.status(200).json(updatedTicket);
});

// @desc    Update Ticket by id
// @route   PUT /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await Ticket.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Ticket deleted successfully" });
});

module.exports = {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
  deleteTicket,
};
