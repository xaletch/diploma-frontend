import type { IDirectoryCustomer, IDirectoryLocation, IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type BookingCreate = {
  customer?: IDirectoryCustomer;
  service?: IDirectoryLocationService;
  location?: IDirectoryLocation;
  employee?: IDirectoryLocationEmployee;
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
    changeBookingServicePrice: (state, action: PayloadAction<number>) => {
      if (state.booking_create) {
        state.booking_create.service = {
          ...state.booking_create.service,
          prices: {
            price: action.payload,
            cost_price: state.booking_create.service?.prices.cost_price,
          },
        } as IDirectoryLocationService;
      }
    },
    resetBookingCreate: (state) => {
      state.booking_create = null;
    },
  },
});

export const { setBookingCreate, changeBookingServicePrice, resetBookingCreate } = bookingSlice.actions;
export default bookingSlice.reducer;
