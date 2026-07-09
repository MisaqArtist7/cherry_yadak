import Link from "next/link"
import Image from "next/image"
import { getAddresses } from "@/action/address"
import  prisma  from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import AddressCard from "@/components/ui/AddressCard"
import AddAddressButton from "@/components/ui/AddAddressButton"

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

export default async function AddressesPage() {
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

    const addresses = await getAddresses()

    return (
        <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold">         
            {/* سایدبار مشتری */}
            <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                    <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                        <Image src='/images/admin.jpg' fill alt="تصویر پروفایل مشتری" className="object-cover rounded-full" />
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 text-base">{user.fullName}</h2>
                        <span className="font-bold text-gray-400 block mt-1">به پنل کاربری خوش آمدید!</span>
                    </div>
                </div>

                <nav className="mt-6 flex-1">
                    <ul className="flex flex-col gap-2">
                        {[  
                            { label: 'صفحه اصلی', icon: '#squares-2x2', href: '/' },
                            { label: 'میز کار', icon: '#squares-2x2', href: '/profile' },
                            { label: 'سفارش ها', icon: '#shopping-bag', href: '/profile/orders' },
                            { label: 'لیست های من', icon: '#heart', href: '/profile/lists' },
                            { label: 'آدرس ها', icon: '#building-library', href: '/profile/addresses', active: true },
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
        
            {/* بخش اصلی مدیریت آدرس‌های مشتری */}
            <div className="flex-1 flex flex-col gap-6">
                
                <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-black text-gray-900">آدرس‌های تحویل سفارش</h1>
                        <p className="text-gray-400 mt-1 font-medium">محل‌های ارسال بار و تخلیه تجهیزات خود را مشخص کنید</p>
                    </div>
                    <AddAddressButton />
                </div>

                {addresses.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center text-gray-400 font-bold">
                        هنوز آدرسی ثبت نکرده‌اید.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {addresses.map((item) => (
                            <AddressCard key={item.id} address={item} />
                        ))}
                    </div>
                )}

            </div>

        </section>
    )
}