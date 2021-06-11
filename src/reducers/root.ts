import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    bandWidth: 100,

    roiExporters: [],
    currentRoiExporter: undefined,

    rateControllers: [],
    currentRateController: undefined,

    stream: undefined,
    streamAfterExportRoi: undefined,
    streamAfterRateControl: undefined,
  },
  reducers: {
    setBandWidth: (state, action) => {
      state.bandWidth = action.payload
    },
  },
})

export const { setBandWidth } = rootSlice.actions

export default rootSlice.reducer
