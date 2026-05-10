import axios from "axios";

const API_URL = "/api/tickets";
const ADMIN_API_URL = "/api/admin/tickets";

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

// Get all tickets by admin
const getAdminTickets = async (token, filter) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let searchParam = filter && `?status=${filter}`;

  const response = await axios.get(
    ADMIN_API_URL + `${searchParam ? searchParam : ""}`,
    config,
  );

  if (response.data) {
    return response.data;
  }
};

// Get Admin ticket by ticketId
const getAdminTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${ADMIN_API_URL}/${ticketId}`, config);

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

// Open ticket through ticketId by Admin
const openTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${ADMIN_API_URL}/${ticketId}`,
    { status: "opened" },
    config,
  );

  if (response.data) {
    return response.data;
  }
};

const ticketService = {
  getTickets,
  getTicket,
  createTicket,
  closeTicket,
  openTicket,
  getAdminTicket,
  getAdminTickets,
};

export default ticketService;
