import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountApi } from '@/queries/account'
import { classesApi } from '@/queries/classes'
import { accountSlice } from '@/slices/account/accountSlice'
import { decksApi } from '@/queries/decks'
import { spaSlice } from '@/slices/SpaSlice'
import { classesSlice } from '@/slices/account/ClassesSlice'


export const store = configureStore({
  reducer: {
    //endpoints
    [accountApi.reducerPath]: accountApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [decksApi.reducerPath]: decksApi.reducer,
    // state
    account: accountSlice.reducer,
    spaslice: spaSlice.reducer,
    classes: classesSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountApi.middleware,
      classesApi.middleware,
      decksApi.middleware),
})

setupListeners(store.dispatch)
