import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import gamingReducer from '../features/gaming/gamingSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    gaming: gamingReducer,
    bookmarks: bookmarksReducer
  },
});
