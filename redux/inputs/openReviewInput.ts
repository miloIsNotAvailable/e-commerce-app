import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { openReviewInputType } from '../../interfaces/reduxInterfaces'

const initialState: openReviewInputType = {
    open: false
}

const openReviewInputSlice = createSlice( {
    name: 'openReviewInputSlice',
    initialState,
    reducers: {
        openInput: (
            state: openReviewInputType,
            action: PayloadAction<openReviewInputType>
        ) => {
            state.open = action.payload.open
        },
    }
} )

export const { 
    openInput
} = openReviewInputSlice.actions

export default openReviewInputSlice.reducer