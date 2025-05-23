import authReducer from "./slices/auth";
import booksReducer from "./slices/books";
import readerBooks from "./slices/readerBooksSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  readerBooks: readerBooks,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["books"], // specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
