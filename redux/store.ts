import { configureStore } from '@reduxjs/toolkit'
import { fetchApi } from './api/fetchApi'
import userData from './auth/authSlice'
import inputData from './inputs/itemInputSlice'
import reviewInput from './inputs/openReviewInput'
import cartItems from './cart/cartSlice'

export const preloadStore = ( preloadedState: any ) => configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
    userData,
    inputData,
    reviewInput,
    cartItems
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