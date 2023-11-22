import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountApi } from '@/queries/account'
import { classesApi } from '@/queries/classes'
import { accountSlice } from '@/slices/account/accountSlice'


export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    account: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware, classesApi.middleware),
})

setupListeners(store.dispatch)
