"use client";
import BookFormModal from "@/commponents/AddBookModal";
import LibrarianTable from "@/commponents/librarianTable";
import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-full p-10">
      <main className="px-10">
        <h1 className="text-white text-2xl font-bold mb-6">Librarian Table</h1>
        <LibrarianTable />
      </main>
      <BookFormModal open={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
