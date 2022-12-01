import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { preloadStore, RootState, store } from '../redux/store'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { PreloadedState } from '@reduxjs/toolkit'

interface WrapperProps {
    children: JSX.Element | JSX.Element[] | string
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: typeof store
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = preloadStore(preloadedState),
    ...renderOptions
  } = {}
) {

  setupListeners(store.dispatch);

  const Wrapper: FC<WrapperProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}


