import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseAuth } from '../../services/firebase';
import { updateCurrentProfile } from '../profile/profileSlice';


const initialState = {
    isLoggedIn: false
};

export const loginUserAsync = createAsyncThunk(
    'login/authenticateUser',
    async (provider, thunkAPI) => {
        let token;

        const resp = await firebaseAuth.signInWithPopup(provider).then(function (result) {
            // The firebase.User instance:
            var user = result.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            token = user.getIdToken();
            thunkAPI.dispatch(updateCurrentProfile(user));
        }, function (error) {
            // The provider's account email, can be used in case of
            // auth/account-exists-with-different-credential to fetch the providers
            // linked to the email:
            var email = error.email;
            // The provider's credential:
            var credential = error.credential;
        });

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
            .addCase(loginUserAsync.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
    },
});

export const { } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;


