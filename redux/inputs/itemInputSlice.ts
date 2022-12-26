import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { itemInputType } from '../../interfaces/reduxInterfaces'

const initialState: itemInputType = {}

const itemInputSlice = createSlice( {
    name: 'itemInputSlice',
    initialState,
    reducers: {
        getItemTitle: (
            state: itemInputType,
            action: PayloadAction<itemInputType>
        ) => {
            state.title = action.payload.title
        },
        getItemDesc: (
            state: itemInputType,
            action: PayloadAction<itemInputType>
        ) => {
            state.desc = action.payload.desc
        },
        getItemImg: (
            state: itemInputType,
            action: PayloadAction<itemInputType>
        ) => {
            state.img = action.payload.img
        },
        getItemCategory: (
            state: itemInputType,
            action: PayloadAction<itemInputType>
        ) => {
            state.category = action.payload.category
        },
    }
} )

export const { 
    getItemDesc,
    getItemImg,
    getItemTitle,
    getItemCategory
} = itemInputSlice.actions

export default itemInputSlice.reducer