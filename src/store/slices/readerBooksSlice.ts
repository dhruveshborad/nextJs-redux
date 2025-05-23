// store/readerBooksSlice.js
import { createSlice } from "@reduxjs/toolkit";
type ReaderBooks = {
  read: string[];
  purchased: string[];
};

const initialState: ReaderBooks = {
  read: [],
  purchased: [],
};

const readerBooksSlice = createSlice({
  name: "readerBooks",
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const book = action.payload;
      if (!state.read.find((b) => b === book)) {
        state.read.push(book);
      }
    },
    markAsPurchased: (state, action) => {
      const book = action.payload;
      if (!state.purchased.find((b) => b === book)) {
        state.purchased.push(book);
      }
    },
    removeFromRead: (state, action) => {
      const bookId = action.payload;
      state.read = state.read.filter((b) => b !== bookId);
    },
    removeFromPurchased: (state, action) => {
      const bookId = action.payload;
      state.purchased = state.purchased.filter((b) => b !== bookId);
    },
  },
});

export const {
  markAsRead,
  markAsPurchased,
  removeFromRead,
  removeFromPurchased,
} = readerBooksSlice.actions;

export default readerBooksSlice.reducer;
