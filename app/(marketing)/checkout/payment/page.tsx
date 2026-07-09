import Link from "next/link"
import { getCart } from "@/action/cart"
import { getAddresses } from "@/action/address"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import PaymentClient from "@/components/ui/PaymentClient"

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

export default async function CheckoutPage() {
    const userId = await getUserId()

    if (!userId) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-bold">برای ادامه خرید ابتدا وارد حساب کاربری شوید.</p>
                <Link href="/login" className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold">
                    ورود به حساب کاربری
                </Link>
            </section>
        )
    }

    const cart = await getCart()
    const addresses = await getAddresses()

    if (cart.items.length === 0) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-bold">سبد خرید شما خالی است.</p>
                <Link href="/" className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold">
                    مشاهده محصولات
                </Link>
            </section>
        )
    }

    if (addresses.length === 0) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-bold">برای ادامه، ابتدا یک آدرس ثبت کنید.</p>
                <Link href="/profile/addresses" className="bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold">
                    افزودن آدرس
                </Link>
            </section>
        )
    }

    return <PaymentClient cart={cart} addresses={addresses} />
}