import { createSlice } from "@reduxjs/toolkit";
export interface TourState {
  isTourOpen: boolean;
}
const initialState: TourState = {
  isTourOpen: false,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    startTour: (state) => {
      state.isTourOpen = true;
    },
    stopTour: (state) => {
      state.isTourOpen = false;
    },
  },
});

export const { startTour, stopTour } = tourSlice.actions;
export default tourSlice.reducer;
