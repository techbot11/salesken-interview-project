import { createSlice } from "@reduxjs/toolkit";

export const defaultState: {
  spaceLaunches: any;
} = {
  spaceLaunches: [],
};

export const SpaceSlice = createSlice({
  name: "space",
  initialState: defaultState,
  reducers: {
    storeSpaceLaunches: (state, action: { payload: any }) => {
      return { ...state, spaceLaunches: action.payload };
    },
  },
});

export const { storeSpaceLaunches } = SpaceSlice.actions;

export default SpaceSlice.reducer;
