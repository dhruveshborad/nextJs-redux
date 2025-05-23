"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import AddBookModal from "./AddBookModal";
import { useMemo } from "react";
import { markAsPurchased } from "@/store/slices/readerBooksSlice";

type PurchasedStatus = "Yes" | "No";

const purchaseColors: Record<PurchasedStatus, string> = {
  Yes: "bg-green-100 text-green-800",
  No: "bg-red-100 text-red-800",
};
export default function BookTable() {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books);
  const readerBooks = useSelector((state: RootState) => state.readerBooks);

  console.log("readerBooks", readerBooks);

  const customBooks = useMemo(() => {
    const demoBook = books
      .map((book) => ({
        ...book,
        purchased: readerBooks.purchased.includes(book.id.toString())
          ? "Yes"
          : "No",
        viewed: readerBooks.read.includes(book.id.toString()),
      }))
      .filter((book) => book.status === "published");

    return demoBook;
  }, [books, readerBooks.purchased]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Example function triggered on Buy button click
  const handleBuy = (id: number) => {
    // Dispatch an action to mark the book as purchased
    dispatch(markAsPurchased(id.toString()));
    console.log(`Book with ID ${id} purchased!`);
  };

  return (
    <div className="h-full w-full p-10">
      <Button color="primary" onPress={onOpen}>
        Add Book
      </Button>
      <AddBookModal isOpen={isOpen} onClose={onClose} />
      <Table
        aria-label="Books collection table"
        className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden"
        style={{ minWidth: "600px" }}
        isStriped
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn className="text-left text-gray-700">Author</TableColumn>
          <TableColumn className="text-left text-gray-700">
            Book Name
          </TableColumn>
          <TableColumn className="text-left text-gray-700">Pieces</TableColumn>
          <TableColumn className="text-left text-gray-700">
            Purchased
          </TableColumn>
          <TableColumn className="text-center text-gray-700">
            Book Buy
          </TableColumn>
        </TableHeader>
        <TableBody>
          {customBooks.map((book) => (
            <TableRow key={book.id} className="group">
              <TableCell className="font-medium">{book.author}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.price}$</TableCell>
              <TableCell>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    purchaseColors[book.purchased as "Yes" | "No"] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {book.purchased}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  onClick={() => handleBuy(book.id)}
                  disabled={book.purchased === "Yes"} // Disable button if already purchased
                >
                  {book.purchased === "Yes" ? "Purchased" : "Buy"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
