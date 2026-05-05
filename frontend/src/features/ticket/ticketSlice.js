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

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  extraReducers: (builders) => {
    builders
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
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "closed")
            : ticket,
        );
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
