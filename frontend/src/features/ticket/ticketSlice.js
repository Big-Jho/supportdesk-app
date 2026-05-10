import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  ticket: {},
  tickets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Get all user's tickets
export const getTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Get all tickets by admin
export const getAdminTickets = createAsyncThunk(
  "tickets/getAdminAll",
  async (filter, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getAdminTickets(token, filter);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Get a particular ticket via ticketId
export const getTicket = createAsyncThunk(
  "tickets/get",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Get Admin a particular ticket  via ticketId
export const getAdminTicket = createAsyncThunk(
  "tickets/getAdmin",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getAdminTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Change a ticket status  - close a ticket
export const closeTicket = createAsyncThunk(
  "tickets/closeTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Change a ticket status  - Open a ticket by admin
export const openTicket = createAsyncThunk(
  "tickets/openTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.openTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

// Filter tickets
export const filterTickets = createAsyncThunk(
  "tickets/filterTicket",
  async (filter, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.filterTickets(filter, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  extraReducers: (builders) => {
    builders

      // Create ticket by users
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      })

      // Get User's tickets
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
        state.tickets = null;
      })

      // Get Single ticket by user
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
        state.ticket = null;
      })

      // Close ticket by user
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "closed")
            : ticket,
        );
      })

      // Open ticket by user
      .addCase(openTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "opened")
            : ticket,
        );
        state.ticket.status = "opened";
      })

      // Get Tickets by Admin
      .addCase(getAdminTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getAdminTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
        state.tickets = null;
      })

      // Get Single ticket by Admin
      .addCase(getAdminTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getAdminTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
        state.ticket = null;
      });
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
