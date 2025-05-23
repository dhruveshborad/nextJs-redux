"use client";
// import AdminTable from "@/commponents/adminTable";
import ReaderTable from "@/commponents/rederTable";
import { RootState } from "@/store/store";
// import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user", user);
  return <ReaderTable />;
}
