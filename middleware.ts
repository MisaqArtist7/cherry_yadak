import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
const { pathname } = req.nextUrl;

// صفحه لاگین خودش نباید قفل باشه
if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
}

if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_session")?.value;
    const valid = token ? await verifySessionToken(token) : false;

    if (!valid) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
    }
}

return NextResponse.next();
}

export const config = {
matcher: ["/admin/:path*"],
};