import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // -------------------------------------------------------------
    // ۱. بررسی احراز هویت برای مسیرهای پنل ادمین (/admin)
    // -------------------------------------------------------------
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        const token = req.cookies.get("admin_session")?.value;
        const valid = token ? await verifySessionToken(token) : false;

        if (!valid) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    // ایجاد پاسخ اصلی
    const response = NextResponse.next();

    // -------------------------------------------------------------
    // ۲. ثبت کوکی بازدید ۲۴ ساعته (has_visited)
    // -------------------------------------------------------------
    const isExcluded = pathname.startsWith('/_next') || pathname.startsWith('/api');
    const hasVisited = req.cookies.get('has_visited');

    if (!hasVisited && !isExcluded) {
        response.cookies.set('has_visited', 'true', {
            maxAge: 60 * 60 * 24, // ۲۴ ساعت
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });
    }

    return response;
}

// تنظیم matcher جامع برای پوشش هم مسیرهای ادمین و هم کل سایت
export const config = {
    matcher: [
        /*
         * اعمال روی تمام مسیرها به جز فایل‌های استاتیک و آیکون‌ها
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};