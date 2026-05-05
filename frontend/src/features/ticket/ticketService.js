import axios from "axios";

const API_URL = "/api/tickets";

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);

  if (response.data) {
    return response.data;
  }
};

// Get ticket by ticketId
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${ticketId}`, config);

  if (response.data) {
    return response.data;
  }
};

// Get all user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  if (response.data) {
    return response.data;
  }
};

// Close ticket by ticketId
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${ticketId}`,
    { status: "closed" },
    config,
  );

  if (response.data) {
    return response.data;
  }
};

const ticketService = { getTickets, getTicket, createTicket, closeTicket };
export default ticketService;
