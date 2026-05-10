import axios from "axios";
import { noteSlice } from "./noteSlice";

const API_URL = "/api/tickets/";
const ADMIN_API_URL = "/api/admin/tickets/";

// Get all ticket's notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

// Get all ticket's notes by admin
const getAdminNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(ADMIN_API_URL + ticketId + "/notes", config);

  return response.data;
};

// Create ticket note
const createNotes = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + "/notes",
    { text: noteText },
    config,
  );

  return response.data;
};

// Create ticket note by admin
const createAdminNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    ADMIN_API_URL + ticketId + "/notes",
    { text: noteText, isStaff: true },
    config,
  );

  return response.data;
};

const noteService = { getNotes, getAdminNotes, createNotes, createAdminNote };

export default noteService;
