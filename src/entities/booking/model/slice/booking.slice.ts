import type { IDirectoryCustomer, IDirectoryLocation, IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BookingCreate = {
  customer?: IDirectoryCustomer;
  service?: IDirectoryLocationService;
  location?: IDirectoryLocation;
  employee?: IDirectoryLocationEmployee;
  // ... more fields
  // ....
  date?: string;
  time?: string;
  // payment_method?: PaymentMethodType;
}

interface BookingState {
  booking_create: BookingCreate | null;
}

function getTodayFormatted(): string {
  const now = new Date();
  return [
    String(now.getDate()).padStart(2, "0"),
    String(now.getMonth() + 1).padStart(2, "0"),
    now.getFullYear(),
  ].join("-");
}

const initialState: BookingState = {
  booking_create: {
    date: getTodayFormatted(),
  },
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
