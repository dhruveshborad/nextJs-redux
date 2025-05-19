import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

type UserRole = "admin" | "librarian" | "reader";

interface MockUser {
  id: string;
  name: string;
  role: UserRole;
  password: string;
}

const mockUsers: MockUser[] = [
  { id: "1", name: "Alice", role: "admin", password: "admin123" },
  { id: "2", name: "Bob", role: "librarian", password: "lib123" },
  { id: "3", name: "Charlie", role: "reader", password: "read123" },
];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  const user = mockUsers.find(
    (u) => u.name === name && u.password === body.password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  });

  // Set cookies for session
  res.headers.set(
    "Set-Cookie",
    serialize("role", user.role, {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    })
  );

  return res;
}
