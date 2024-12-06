import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch all feature images
export const getFeatureImages = createAsyncThunk(
  "/commonFeature/getFeatureImages",  // Updated to match feature image context
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data;
  }
);

// Add a new feature image
export const addFeatureImage = createAsyncThunk(
  "/commonFeature/addFeatureImage",  // Updated to match feature image context
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// Delete a feature image
export const deleteFeatureImage = createAsyncThunk(
  "/commonFeature/deleteFeatureImage",  // Updated to match feature image context
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${id}`
    );
    return response.data;  // Ensure that the response contains the necessary info
  }
);

const commonSlice = createSlice({
  name: "commonFeature",  // Updated name for clarity
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure that the deleted image is removed from the list
        state.featureImageList = state.featureImageList.filter(
          (image) => image.id !== action.meta.arg // `action.meta.arg` holds the id passed
        );
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
