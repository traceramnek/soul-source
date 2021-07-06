import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseAuth, firebaseDB } from '../../services/firebase';
import { closeLoader, openLoader } from '../globalUIManager/globalUIManagerSlice';
import { updateCurrentProfile, fetchProfileByIdAsync } from '../profile/profileSlice';
import { isNullOrUndefined } from '../../util/utils';


const initialState = {
    isLoggedIn: false
};

export const loginUserAsync = createAsyncThunk(
    'login/authenticateUser',
    async (provider, thunkAPI) => {
        let token;
        thunkAPI.dispatch(openLoader('Logging in...'));

        const resp = await firebaseAuth.signInWithPopup(provider).then(function (result) {
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

export const saveUserAsync = createAsyncThunk(
    'login/saveUser',
    async (user, thunkAPI) => {
        thunkAPI.dispatch(openLoader('Setting up your profile...'));

        //if user doesn't exist, add them to db
        firebaseDB.ref('users/' + user.id).set({
            id: user.id,
            name: user.name,
            email: user.email,
            profilePicPath: user.picture
        });

        thunkAPI.dispatch(fetchProfileByIdAsync(user.id));
        thunkAPI.dispatch(closeLoader());

        // "users": {
        //     "$userId": {
        //       // grants write access to the owner of this user account
        //       // whose uid must exactly match the key ($userId)
        //       ".write": "$userId === auth.uid"
        //     }
        //   }

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

export const { } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.login.isLoggedIn;

export default loginSlice.reducer;


