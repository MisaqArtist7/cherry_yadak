import ScrollProgressBarComponent from "./ScrollProgressBar"
import MainNavComponent from "./MainNav"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"

// دریافت دسته‌بندی‌ها از دیتابیس به صورت سرور ساید
const categories = await prisma.categories.findMany({
    select: {
        name: true,
        slug: true,
    }
})

export default function HeaderComponent() {
    return (
        <header className="bg-white border-b border-gray-100 shadow sticky top-0 z-50 transition-all duration-300">
            <div className="mx-auto px-4 md:px-11">
                
                {/* هدر اصلی */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-5 gap-4 sm:gap-8">
                    
                    {/* لوگو و بخش سرچ */}
                    <div className="flex items-center justify-between sm:justify-start gap-8 grow">
                        
                        {/* لوگو */}
                        <Link href="/" className="shrink-0">
                            <Image
                                src="/images/logo.png"
                                width={140}
                                height={45}
                                alt="لوگوی سایت"
                                className="h-9 sm:h-10 w-auto cursor-pointer"
                            />
                        </Link>

                        {/* فرم سرچ (در حالت دسکتاپ بغل لوگو، در حالت موبایل مخفی می‌شود و جایش پایین‌تر می‌رود) */}
                        <form className="w-full max-w-xs relative hidden md:block transition-all duration-300 ease-in-out focus-within:max-w-md">
                            <input
                                type="search"
                                placeholder="جستجو در محصولات چری یدک..."
                                className="w-full font-medium bg-gray-50 border border-zinc-300 rounded-full pr-11 pl-4 py-2.5 outline-none transition-all focus:border-(--primaryColor) focus:bg-white focus:ring-4 focus:ring-[#D92F4E]/20"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <use href="#searchIcon"></use>
                            </svg>
                        </form>
                    </div>

                    {/* فرم سرچ مخصوص موبایل و تبلت (زیر لوگو نمایش داده می‌شود) */}
                    <div className="w-full md:hidden">
                        <form className="w-full relative">
                            <input
                                type="search"
                                placeholder="جستجو در محصولات چری یدک..."
                                className="w-full text-sm font-medium bg-gray-50 border border-zinc-300 rounded-full pr-11 pl-4 py-2.5 outline-none focus:border-(--primaryColor) focus:bg-white"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <use href="#searchIcon"></use>
                            </svg>
                        </form>
                    </div>

                </div>

                {/* ناوبری اصلی (ریسپانسیو داخلی دارد) */}
                <MainNavComponent categories={categories} />
            </div>

            {/* نوار پیشرفت اسکرول */}
            <ScrollProgressBarComponent />
        </header>
    )
}