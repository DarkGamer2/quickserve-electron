import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface ProfileState{
    email:string;
    skillset:string;
    loading:boolean;
    error:string | null;
    profilePic:string,
    fullName:string
}

const initialState:ProfileState={
    email:'',
    skillset:'',
    loading:false,
    error:null,
    profilePic:'',
    fullName:''
}

export const fetchProfile=createAsyncThunk('profile/fetchProfile',async(id:string)=>{
    const response=await axios.get(`http://localhost:3000/api/users/profile/${id}`);
    return response.data;
})

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(fetchProfile.fulfilled,(state,action:PayloadAction<ProfileState>)=>{
            state.loading=false;
            state.email=action.payload.email;
            state.skillset=action.payload.skillset;
        });
        builder.addCase(fetchProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message ?? 'Unknown error';
        });
    }
});

export default profileSlice.reducer;