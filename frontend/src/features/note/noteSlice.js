import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get ticket notes
export const getNotes = createAsyncThunk(
  "note/getAll",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
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

// Create ticket note
export const createNotes = createAsyncThunk(
  "note/create",
  async ({ ticketId, noteText }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNotes(noteText, ticketId, token);
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

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
        state.notes = null;
      })
      .addCase(createNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
        state.notes = null;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
