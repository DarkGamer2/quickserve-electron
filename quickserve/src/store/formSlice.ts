// FILE: src/store/formSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import PCRepairImage from '../assets/images/pcrepairs.jpg';
import Coding from '../assets/images/coding.jpg';
import Networking from '../assets/images/networking.jpg';

interface FormState {
  jobRequester: string;
  jobDescription: string;
  jobRequestDate: string;
  assignedBy: string;
  jobLocation: string;
  jobType: string;
  jobStatus: string;
  jobIcon: string;
  roomNumber?: string;
  phoneNumber?: string;
  unit?: string;
  requesterEmail?: string;
  productInformation: {
    productManufacturer?: string;
    productModelNumber?: string;
    productSerialNumber?: string;
  };
  successMessage?: string;
}

const initialState: FormState = {
  jobRequester: '',
  jobDescription: '',
  jobRequestDate: '',
  assignedBy: '',
  jobLocation: '',
  jobType: '',
  jobStatus: 'Pending',
  jobIcon: '',
  productInformation: {
    productManufacturer: '',
    productModelNumber: '',
    productSerialNumber: '',
  },
  successMessage: '',
};

export const jobTypeIcons: { [key: string]: string } = {
  'PC Repairs': PCRepairImage,
  'Web Development': Coding,
  'Networking': Networking,
};

export const addJob = createAsyncThunk('form/addJob', async (formData: FormState) => {
  const response = await axios.post('http://localhost:3000/api/jobs/addjob', formData);
  return response.data;
});

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      const { field, value } = action.payload;
      if (field in state) {
        (state as any)[field] = value;
      } else if (field in state.productInformation) {
        state.productInformation[field as keyof typeof state.productInformation] = value;
      }
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(addJob.fulfilled, (state, action) => {
      // Handle successful job creation
      state.successMessage = 'Job created successfully!';
      console.log(action.payload);
    });
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;