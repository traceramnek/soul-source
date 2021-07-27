import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseAuth, firebaseDB } from '../../services/firebase';
import { closeLoader, openLoader } from '../globalUIManager/globalUIManagerSlice';
import { fetchProfileByIdAsync } from '../profile/profileSlice';
import { SoulSourceService } from '../../services/SoulSourceService';


const initialState = {
    isLoggedIn: false
};

export const loginUserAsync = createAsyncThunk(
    'login/authenticateUser',
    async (provider, thunkAPI) => {
        // let token;
        thunkAPI.dispatch(openLoader('Logging in...'));
        let isLoggedIn = false;

        await firebaseAuth.signInWithPopup(provider).then(function (result) {
            // The firebase.User instance:
            const user = result.additionalUserInfo.profile;
            // token = user.getIdToken();

            //if user is new, add them to db
            if (result.additionalUserInfo.isNewUser) {
                thunkAPI.dispatch(saveUserAsync(user));
            } else { // if user is not new, fetch their data form db and update profile state
                thunkAPI.dispatch(fetchProfileByIdAsync(user.id));
                thunkAPI.dispatch(closeLoader());
            }
            isLoggedIn = true;
        }, function (error) {
            // The provider's account email, can be used in case of
            // auth/account-exists-with-different-credential to fetch the providers
            // linked to the email:
            // var email = error.email;
            // The provider's credential:
            // var credential = error.credential;
            thunkAPI.dispatch(closeLoader());
            isLoggedIn = false;
        });
        return isLoggedIn;
    }
);

export const saveUserAsync = createAsyncThunk(
    'login/saveUser',
    async (user, thunkAPI) => {
        thunkAPI.dispatch(openLoader('Setting up your profile...'));

        //if user doesn't exist, add them to db
        await SoulSourceService.saveUser(user);

        thunkAPI.dispatch(fetchProfileByIdAsync(user.id));
        thunkAPI.dispatch(closeLoader());

    }
);


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoggedIn = false
            })
            .addCase(loginUserAsync.rejected, (state) => {
                state.isLoggedIn = false
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload;
            })
            .addCase(saveUserAsync.pending, (state) => {
                state.isLoggedIn = false
            })
            .addCase(saveUserAsync.rejected, (state) => {
                state.isLoggedIn = false
            })
            .addCase(saveUserAsync.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
    },
});

// export const { } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;


