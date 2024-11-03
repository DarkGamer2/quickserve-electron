// FILE: src/store/formSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductInformation {
  productManufacturer: string;
  productModelNumber: string;
  productSerialNumber: string;
}

interface FormState {
  jobRequester: string;
  roomNumber: string;
  phoneNumber: string;
  unit: string;
  requesterEmail: string;
  jobLocation: string;
  productInformation: ProductInformation;
  jobDescription: string;
  jobRequestDate: string;
  loading: boolean;
  error: string | null;
  success: boolean;
  assignedBy?: string;
  jobType?: string;
}

const initialState: FormState = {
  jobRequester: '',
  roomNumber: '',
  phoneNumber: '',
  unit: '',
  requesterEmail: '',
  jobLocation: '',
  productInformation: {
    productManufacturer: '',
    productModelNumber: '',
    productSerialNumber: '',
  },
  jobDescription: '',
  jobRequestDate: '',
  loading: false,
  error: null,
  success: false,
  assignedBy: '',
  jobType: '',
};

export const addJob = createAsyncThunk(
  'form/addJob',
  async (formData: FormState, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/jobs/createjob', formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload;
      if (field in state) {
        (state as any)[field] = value;
      } else if (field in state.productInformation) {
        state.productInformation[field as keyof ProductInformation] = value;
      }
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;