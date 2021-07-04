import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';
import gamingReducer from '../features/gaming/gamingSlice';
import eventsReducer from '../features/events/eventsSlice';
import globalUIManagerReducer from '../features/globalUIManager/globalUIManagerSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    gaming: gamingReducer,
    events: eventsReducer,
    ui: globalUIManagerReducer,
    login: loginReducer
  }
});
