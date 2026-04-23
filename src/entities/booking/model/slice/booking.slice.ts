import type { IDirectoryCustomer, IDirectoryEmployee, IDirectoryLocation, IDirectoryService } from "@/entities/directories";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type BookingCreate = {
  customer?: IDirectoryCustomer;
  service?: IDirectoryService;
  location?: IDirectoryLocation;
  employee?: IDirectoryEmployee;
  // ... more fields
  // ....
}

interface BookingState {
  booking_create: BookingCreate | null;
}

const initialState: BookingState = {
  booking_create: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingCreate: (state, action: PayloadAction<BookingCreate>) => {
      if (state.booking_create) {
        state.booking_create = { ...state.booking_create, ...action.payload };
      } else {
        state.booking_create = action.payload;
      }
    },
    resetBookingCreate: (state) => {
      state.booking_create = null;
    }
  },
});

export const { setBookingCreate, resetBookingCreate } = bookingSlice.actions;
export default bookingSlice.reducer;
