import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountApi } from '@/queries/account'


export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware),
})

setupListeners(store.dispatch)
