const asyncHandler = require("express-async-handler");

const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc    Get ticket notes by ticketid
// @route   GET /api/tickets/:ticketId/note
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/note
// @access  Private
const addNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const notes = await Note.create({
    user: req.user.id,
    ticket: req.params.ticketId,
    isStaff: false,
    text: req.body.text,
  });

  res.status(201).json(notes);
});

module.exports = { getNotes, addNotes };
