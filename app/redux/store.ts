import { configureStore } from "@reduxjs/toolkit";
import { adminsApi } from "./services/adminsApi";
import { categoriesApi} from "./services/categoriesApi"

export const store = configureStore({
  reducer: {
    [adminsApi.reducerPath]: adminsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminsApi.middleware,
      categoriesApi.middleware
    ),
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;