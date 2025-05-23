// components/BooksTable.js
import { deleteBook, updateBookStatus } from "@/store/slices/books";
import { RootState } from "@/store/store";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

type BookStatus = "published" | "request" | "out of stock";

const statusColors: Record<BookStatus, string> = {
  published: "bg-green-600",
  request: "bg-yellow-600",
  "out of stock": "bg-red-600",
};

export default function AdminTable() {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books);

  console.log("books", books);

  const handleStatusChange = (id: number, newStatus: string) => {
    dispatch(updateBookStatus({ id, status: newStatus }));
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="p-3">Book Name</th>
            <th className="p-3">Author</th>
            <th className="p-3">Status</th>
            <th className="p-3">Price</th>
            <th className="p-3 text-center">Actions</th>
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
                <select
                  className={`rounded px-3 py-1 text-sm capitalize ${
                    statusColors[book.status]
                  } text-white`}
                  value={book.status}
                  onChange={(e) => handleStatusChange(book.id, e.target.value)}
                >
                  <option value="published">Published</option>
                  <option value="request">Request</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </td>
              <td className="p-3">{book.price} $</td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-4">
                  <PencilSquareIcon className="h-5 w-5 cursor-pointer text-gray-300 hover:text-white" />
                  <TrashIcon
                    className="h-5 w-5 cursor-pointer text-pink-500 hover:text-red-500"
                    onClick={() => dispatch(deleteBook({ id: book.id }))}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
