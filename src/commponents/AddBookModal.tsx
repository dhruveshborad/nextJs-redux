"use client";

import { addRequestToAdmin } from "@/store/slices/books";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function BookFormModal({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (item: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleSubmit = () => {
    console.log({ bookName, author, price });
    dispatch(addRequestToAdmin({ bookName, author, price }));
    setBookName("");
    setAuthor("");
    setPrice("");
    setIsOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-bold mb-4 text-center">
              Add a New Book
            </h2>

            {/* Book Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Book Name
              </label>
              <input
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                placeholder="Enter the book title"
                className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Author Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author's name"
                className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pieces Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Pieces
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Number of pieces available"
                className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
