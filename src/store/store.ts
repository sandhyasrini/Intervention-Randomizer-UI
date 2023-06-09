import { configureStore } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { developerSlice } from './slices/developerSlice'
import { modalSlice } from './slices/modalSlice'
import type { PreloadedState } from '@reduxjs/toolkit'
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector
} from 'react-redux'

export function createStore (): any {
  return configureStore({
    reducer: {
      developer: developerSlice.reducer,
      modal: modalSlice.reducer
    }
  })
}

export const store = createStore()

export const setupStore = (preloadedState?: PreloadedState<RootState>): any => {
  return configureStore({
    reducer: {
      developer: developerSlice.reducer,
      modal: modalSlice.reducer
    },
    preloadedState
  })
}
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
type DispatchType = typeof store.dispatch
export const useAppDispatch: () => DispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const getModal = (state: { modal: any }): any => state.modal
const getDeveloper = (state: { developer: any }): any => state.developer
export const createNewDeveloperSelector = createSelector(
  [getDeveloper],
  (state) => state
)
export const createNewModalSelector = createSelector(
  [getModal],
  (state) => state
)
