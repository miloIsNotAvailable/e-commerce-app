import { configureStore } from '@reduxjs/toolkit'
import { fetchApi } from './api/fetchApi'

export const preloadStore = ( preloadedState: any ) => configureStore({
    // userData: () => {},
  reducer: {
      [fetchApi.reducerPath]: fetchApi.reducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware( {
    serializableCheck: false,
    immutableCheck: false
  } ).concat( [ fetchApi.middleware ] )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const store = preloadStore( {} )