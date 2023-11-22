import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountApi } from '@/queries/account'
import { accountSlice } from '@/slices/account/accountSlice'


export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    account: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware),
})

setupListeners(store.dispatch)
