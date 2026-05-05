import axios from "axios";
import { noteSlice } from "./noteSlice";

const API_URL = "/api/tickets/";

const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId + "/notes", config);

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

const noteService = { getNotes, createNotes };

export default noteService;
