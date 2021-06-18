import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import gamingReducer from '../features/gaming/gamingSlice';
import eventsReducer from '../features/events/eventsSlice';
import globalSnackbarReducer from '../features/globalSnackbar/globalSnackbarSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    gaming: gamingReducer,
    events: eventsReducer,
    bookmarks: bookmarksReducer,
    ui: globalSnackbarReducer
  },
});
