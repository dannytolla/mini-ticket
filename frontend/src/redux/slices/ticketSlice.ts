import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiClient from "../apiClient";

// Types
export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketState {
  tickets: Ticket[];
  ticket: Ticket | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TicketState = {
  tickets: [],
  ticket: null,
  loading: false,
  error: null,
};

// Async thunks
export const getTickets = createAsyncThunk("tickets/getTickets", async () => {
  try {
    const response = await apiClient.get(`/tickets`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
});

export const getTicket = createAsyncThunk(
  "tickets/getTicket",
  async (id: string) => {
    try {
      const response = await apiClient.get(`/tickets/${id}`);
      return response.data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData: {
    title: string;
    description: string;
    priority: string;
  }) => {
    try {
      const response = await apiClient.post(`/tickets`, ticketData);

      toast.success("Ticket created successfully");

      return response.data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({
    id,
    ticketData,
  }: {
    id: string;
    ticketData: { status: string };
  }) => {
    try {
      const response = await apiClient.put(`/tickets/${id}`, ticketData);
      return response.data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
);

// Slice
const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearTicket: (state) => {
      state.ticket = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Tickets
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Ticket
      .addCase(getTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = [action.payload, ...state.tickets];
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Ticket
      .addCase(updateTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        );
        state.ticket = action.payload;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTicket, clearError } = ticketSlice.actions;
export default ticketSlice.reducer;
