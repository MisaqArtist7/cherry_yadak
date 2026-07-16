import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
const { username, password } = await req.json();

if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
) {
    const token = await createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // ۷ روز
    });
    return res;
}

return NextResponse.json({ ok: false }, { status: 401 });
}