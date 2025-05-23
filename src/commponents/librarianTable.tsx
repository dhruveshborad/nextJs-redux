"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type BookStatus = "published" | "request" | "out of stock";

const statusColors: Record<BookStatus, string> = {
  published: "bg-green-600",
  request: "bg-yellow-600",
  "out of stock": "bg-red-600",
};

export default function LibrarianTable() {
  const books = useSelector((state: RootState) => state.books);
  return (
    <div className="bg-gray-900 h-full w-full text-white p-6 rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="p-3">Book Name</th>
            <th className="p-3">Author</th>
            <th className="p-3">Status</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className="border-t border-gray-700 hover:bg-gray-800"
            >
              <td className="p-3">{book.bookName}</td>
              <td className="p-3">{book.author}</td>
              <td className="p-3">
                <p
                  className={`rounded px-3 w-fit py-1 text-sm capitalize ${
                    statusColors[book.status]
                  } text-white`}
                >
                  {book.status}
                </p>
              </td>
              <td className="p-3">{book.price} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
