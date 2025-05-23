import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookStatus = "published" | "request" | "out of stock";

interface Book {
  id: number;
  bookName: string;
  status: BookStatus;
  author: string;
  price: number;
}

const initialState: Book[] = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Add book with "request" status
    addRequestToAdmin: (state, action) => {
      state.push({
        id: Date.now(),
        bookName: action.payload.bookName,
        author: action.payload.author,
        price: action.payload.price,
        status: "request",
      });
    },

    updateBookStatus: (state, action) => {
      const { id, status } = action.payload;
      const book = state.find((b) => b.id === id);
      if (book) {
        book.status = status;
      }
    },

    deleteBook: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((book) => book.id !== action.payload.id);
    },
  },
});

export const { addRequestToAdmin, updateBookStatus, deleteBook } =
  booksSlice.actions;
export default booksSlice.reducer;
