import { configureStore } from "@reduxjs/toolkit";
import { adminsApi } from "./services/adminsApi";

export const store = configureStore({
  reducer: {
    [adminsApi.reducerPath]:
      adminsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminsApi.middleware
    ),
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;