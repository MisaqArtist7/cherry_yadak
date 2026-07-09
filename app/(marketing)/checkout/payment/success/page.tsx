import Link from "next/link"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { notFound } from "next/navigation"

async function getUserId() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null
    try {
        const payload = verifyToken(token) as { userId: number }
        return payload.userId
    } catch {
        return null
    }
}

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string }>
}) {
    const { orderId } = await searchParams
    const userId = await getUserId()

    if (!orderId || !userId) {
        notFound()
    }

    const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) },
    })

    if (!order || order.userId !== userId) {
        notFound()
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-2xl font-black text-gray-900 mb-2">سفارش شما با موفقیت ثبت شد</h1>
            <p className="text-gray-500 font-medium mb-1">
                کد سفارش شما: <span className="font-mono font-bold text-gray-800">#{order.id.toLocaleString("fa-IR")}</span>
            </p>
            <p className="text-gray-500 font-medium mb-8">
                کارشناسان ما به‌زودی جهت هماهنگی ارسال با شما تماس خواهند گرفت.
            </p>

            <div className="flex gap-3">
                <Link
                    href={`/profile/orders/${order.id}`}
                    className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#b8233f] transition-all"
                >
                    مشاهده جزئیات سفارش
                </Link>
                <Link
                    href="/"
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                    بازگشت به فروشگاه
                </Link>
            </div>
        </section>
    )
}