import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

const getGoalsService = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get("http://localhost:3000/dashboard/savinggoals")

    return response.data;
}

export const getGoals = createAsyncThunk("/dashboard/savinggoals", async (_, thunkAPI) => {
    try {
        //change to get token from local storage
      const token = thunkAPI.getState().auth.user.token;
      return await getGoalsService(token)

    } catch(error) {
        const message = 
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

const createGoalService = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${tokaen},`
        },
    }
}

export const createGoal = createAsyncThunk(
    'goals/create',
    async (goalData, thunkAPI) => {
        try{
            //change to get token from local storage
          const token = thunkAPI.getState().auth.user.token;
          return await createGoalService(goalData, token)

        } catch (error) {
            const message = 
            (error.response &&
            error.response.data &&
            error.response.message) || 
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)

        }
    }
)

const deleteGoalService = async (goalID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete("http://localhost:3000/dashboard/savinggoals" + goalID, config)

    return response.data
}

export const deleteGoal = createAsyncThunk(
    'goals/delete', 
    async (id, thunkAPI) => {
        try {
            //change to get token from local storage
            const token = thunkAPI.getState().auth.user.token
            return await deleteGoalService(id, token)

        } catch (error) {
            const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
          .addCase(createGoal.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.goals.push(action.payload)
          })
          .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
          })
          .addCase(getGoals.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.goals.push(action.payload)
          })
          .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
          })
          .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isSuccess = true,
            state.goals.push(action.payload)
          })
          .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
          })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer