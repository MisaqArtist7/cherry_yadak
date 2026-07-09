import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null
    try {
        const payload = verifyToken(token) as { userId: number }
        return await prisma.user.findUnique({ where: { id: payload.userId } })
    } catch {
        return null
    }
}

const statusMap: Record<string, { label: string; style: string }> = {
    PENDING: { label: "در انتظار پرداخت", style: "bg-amber-50 text-amber-600" },
    PAID: { label: "پرداخت‌شده", style: "bg-blue-50 text-blue-600" },
    PROCESSING: { label: "در حال پردازش", style: "bg-amber-50 text-amber-600" },
    SHIPPED: { label: "ارسال‌شده", style: "bg-indigo-50 text-indigo-600" },
    DELIVERED: { label: "تحویل شده", style: "bg-emerald-50 text-emerald-600" },
    CANCELED: { label: "لغو شده", style: "bg-rose-50 text-rose-600" },
}

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = await getCurrentUser()

    if (!user) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-bold">برای مشاهده این صفحه ابتدا وارد حساب کاربری شوید.</p>
                <Link href="/login" className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold">
                    ورود به حساب کاربری
                </Link>
            </section>
        )
    }

    const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
            items: { include: { product: { include: { images: true } } } },
            address: true,
        },
    })

    if (!order || order.userId !== user.id) {
        notFound()
    }

    const statusInfo = statusMap[order.status] ?? { label: order.status, style: "bg-gray-50 text-gray-600" }
    const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0)
    const itemsTotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-8 md:p-8" dir="rtl">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* هدر */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-black text-xl text-gray-900">
                            فاکتور سفارش #{order.id.toLocaleString("fa-IR")}
                        </h1>
                        <p className="text-gray-400 font-medium mt-1">
                            {new Intl.DateTimeFormat("fa-IR", {
                                year: "numeric", month: "long", day: "numeric",
                                hour: "2-digit", minute: "2-digit",
                            }).format(order.createdAt)}
                        </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full font-bold ${statusInfo.style}`}>
                        {statusInfo.label}
                    </span>
                </div>

                {/* آدرس تحویل */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-3">
                    <h2 className="font-black text-gray-900 border-b border-gray-50 pb-3">آدرس تحویل</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-medium">
                        <div className="bg-gray-50/60 p-4 rounded-xl">
                            <span className="text-gray-400 text-xs block mb-1">نام گیرنده</span>
                            <span className="font-bold text-gray-800">{order.address.fullName}</span>
                        </div>
                        <div className="bg-gray-50/60 p-4 rounded-xl">
                            <span className="text-gray-400 text-xs block mb-1">شماره تماس</span>
                            <span className="font-bold text-gray-800 font-mono" dir="ltr">{order.address.phone}</span>
                        </div>
                        <div className="sm:col-span-2 bg-gray-50/60 p-4 rounded-xl">
                            <span className="text-gray-400 text-xs block mb-1">آدرس کامل</span>
                            <span className="font-bold text-gray-800 leading-relaxed">
                                {order.address.province}، {order.address.city}، {order.address.fullAddress}
                            </span>
                        </div>
                    </div>
                </div>

                {/* لیست محصولات */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h2 className="font-black text-gray-900 border-b border-gray-50 pb-3">
                        کالاهای سفارش ({itemsCount.toLocaleString("fa-IR")})
                    </h2>

                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50/60 transition-colors">
                                <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                    {item.product.images?.[0] && (
                                        <Image
                                            src={item.product.images[0].url}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{item.product.title}</h4>
                                    <p className="text-gray-400 text-sm">
                                        {item.quantity.toLocaleString("fa-IR")} عدد × {item.price.toLocaleString("fa-IR")} تومان
                                    </p>
                                </div>
                                <div className="font-black text-gray-900">
                                    {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* جمع کل */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-gray-500 font-medium">
                        <span>جمع کالاها</span>
                        <span className="font-bold text-gray-800">{itemsTotal.toLocaleString("fa-IR")} تومان</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 font-medium">
                        <span>هزینه ارسال</span>
                        <span className="font-bold text-emerald-600">رایگان</span>
                    </div>
                    <div className="border-t border-gray-50 pt-3 flex items-center justify-between font-black text-lg text-gray-900">
                        <span>مبلغ نهایی</span>
                        <span className="text-[#D92F4E]">{order.totalAmount.toLocaleString("fa-IR")} تومان</span>
                    </div>
                </div>

                <Link
                    href="/profile/orders"
                    className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                    بازگشت به لیست سفارش‌ها
                </Link>

            </div>
        </section>
    )
}