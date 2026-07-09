import Link from "next/link"
import Image from "next/image"
import { getUserOrders } from "@/action/order"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import prisma  from "@/lib/prisma"
import OrderSearchBox from "@/components/ui/OrderSearchBox"

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

const tabs = [
    { key: "all", label: "همه خریدها" },
    { key: "PROCESSING", label: "جاری (در حال پردازش)" },
    { key: "DELIVERED", label: "تحویل داده شده" },
    { key: "CANCELED", label: "لغو شده" },
]

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string; q?: string }>
}) {
    const user = await getCurrentUser()

    if (!user) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-bold">برای مشاهده سفارش‌ها ابتدا وارد حساب کاربری شوید.</p>
                <Link href="/login" className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold">
                    ورود به حساب کاربری
                </Link>
            </section>
        )
    }

    const { status = "all", q = "" } = await searchParams

    let orders = await getUserOrders(status)

    // جستجو روی کد سفارش (بر اساس id)
    if (q) {
        orders = orders.filter((order) =>
            order.id.toString().includes(q.trim())
        )
    }

    return (
        <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
            
            <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                    <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                        <Image src='/images/admin.jpg' fill alt="تصویر کاربر" className="object-cover rounded-full" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-base">{user.fullName}</h2>
                        <span className="font-bold text-gray-400 block mt-1">به پنل کاربری خوش آمدید!</span>
                    </div>
                </div>

                <nav className="mt-6 flex-1">
                    <ul className="flex flex-col gap-2">
                        {[
                            { label: 'میز کار', icon: '#squares-2x2', href: '/profile' },
                            { label: 'سفارش ها', icon: '#shopping-bag', href: '/profile/orders', active: true },
                            { label: 'لیست های من', icon: '#heart', href: '/profile/lists' },
                            { label: 'آدرس ها', icon: '#building-library', href: '/profile/addresses' },
                            { label: 'اطلاعات حساب کاربری', icon: '#identification', href: '/profile/personal-info' },
                            { label: 'خروج از حساب کاربری', icon: '#arrow-left-start-on-rectangle', href: '/' }
                        ].map((item, index) => (
                            <li key={index}>
                                <Link 
                                    href={item.href} 
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 group ${
                                        item.active 
                                        ? 'bg-[#D92F4E] text-white shadow-lg shadow-[#D92F4E]/20' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                    }`}
                                >
                                    <svg className={`w-5 h-5 transition-colors ${item.active ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                        <use href={item.icon}></use>
                                    </svg>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        
            <div className="flex-1 flex flex-col gap-6">
                
                <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 space-y-5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50 pb-4">
                        <h1 className="text-xl font-black text-gray-900">مدیریت سفارش‌ها</h1>
                        <OrderSearchBox defaultValue={q} />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.key}
                                href={`/profile/orders?status=${tab.key}${q ? `&q=${q}` : ""}`}
                                className={`px-4 py-2.5 rounded-xl font-bold transition-colors cursor-pointer ${
                                    status === tab.key
                                        ? "bg-[#D92F4E] text-white shadow-md shadow-[#D92F4E]/10"
                                        : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                                }`}
                            >
                                {tab.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl border border-gray-100 overflow-hidden">
                    {orders.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 font-bold">
                            سفارشی یافت نشد.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-400 font-bold border-b border-gray-100">
                                        <th className="p-4">کد سفارش</th>
                                        <th className="p-4">تاریخ ثبت سفارش</th>
                                        <th className="p-4">تعداد کالاها</th>
                                        <th className="p-4">مبلغ کل (تومان)</th>
                                        <th className="p-4 text-center">وضعیت سفارش</th>
                                        <th className="p-4 text-center">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                                    {orders.map((order) => {
                                        const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0)
                                        const statusInfo = statusMap[order.status] ?? { label: order.status, style: "bg-gray-50 text-gray-600" }

                                        return (
                                            <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                                                <td className="p-4 font-bold text-gray-900 font-mono">
                                                    #{order.id.toLocaleString("fa-IR")}
                                                </td>
                                                <td className="p-4 text-gray-500">
                                                    {new Intl.DateTimeFormat("fa-IR", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    }).format(order.createdAt)}
                                                </td>
                                                <td className="p-4 text-gray-600">
                                                    {itemsCount.toLocaleString("fa-IR")} کالا
                                                </td>
                                                <td className="p-4 text-gray-900 font-black">
                                                    {order.totalAmount.toLocaleString("fa-IR")}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full font-bold ${statusInfo.style}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Link
                                                        href={`/profile/orders/${order.id}`}
                                                        className="font-bold text-[#D92F4E] hover:bg-[#D92F4E]/5 border border-[#D92F4E]/20 px-3 py-1.5 rounded-lg transition-all cursor-pointer inline-block"
                                                    >
                                                        جزئیات فاکتور
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>

        </section>
    )
}