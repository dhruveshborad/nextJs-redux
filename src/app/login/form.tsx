"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const dispatch = useDispatch();
  async function loginUser(name: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    const data = await res.json();
    return data.user;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser(name, password);
      dispatch(login(user));
      router.push("/");
      // redirect, toast, etc.
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="name">Name</label>
        <input
          className="w-full flex h-10 rounded-md border border-indigo-300 bg-transparent py-2 px-3 text-sm placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-700 dark:text-indigo-50 dark:focus:ring-indigo-400 dark:focus:ring-offset-indigo-900"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="Enter your name"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="password">Password</label>
        <input
          className="w-full flex h-10 rounded-md border border-indigo-300 bg-transparent py-2 px-3 text-sm placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-700 dark:text-indigo-50 dark:focus:ring-indigo-400 dark:focus:ring-offset-indigo-900"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </div>
      {error && <div className="p-2 rounded bg-red-200">{error}</div>}
      <div className="w-full ">
        <button
          type="submit"
          className="w-full h-10 py-2 px-4 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:hover:bg-indigo-800 dark:hover:text-indigo-100 disabled:opacity-50 dark:focus:ring-indigo-400 disabled:pointer-events-none dark:focus:ring-offset-indigo-900 data-[state=open]:bg-indigo-100 dark:data-[state=open]:bg-indigo-800 bg-indigo-900 text-white hover:bg-indigo-700 dark:bg-indigo-50 dark:text-indigo-900"
        >
          Login
        </button>
      </div>
    </form>
  );
};
