import Image from "next/image"

export default function FooterComponent() {
    const quickLinks = [
        {id: 1, title: "خانه", href:"/"},
        {id: 2, title: "شگفت انگیزها", href:"/discounts"},
        {id: 3, title: "تماس باما", href:"/contact-us"},
        {id: 4, title: "درباره ما", href:"/about-us"},
    ]
    return (
        <footer className="bg-white border-t border-gray-200 mt-4">
            <div className="container mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-8">
                
                {/* ۱. بخش بالایی: لوگو و تماس */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 pb-7 border-b-2 border-[#D92F4E]/10">                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-600 w-full lg:w-auto justify-center lg:justify-end">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">تلفن پشتیبانی:</span>
                            <span className="text-lg sm:text-xl font-black text-(--primaryColor) tracking-tight">۰۲۱-۶۱۹۳۰۰۰۰</span>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                        <span className="text-xs sm:text-sm font-medium text-gray-400 text-center sm:text-right">
                            ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
                        </span>
                    </div>
                </div>

                {/* ۲. بخش ویژگی‌ها (کارت‌ها کاملاً ریسپانسیو با هاور گروهی) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-10 md:py-12 border-b border-gray-100">
                    {[
                        { src: 'express-delivery', label: 'تحویل اکسپرس' },
                        { src: 'cash-on-delivery', label: 'پرداخت در محل' },
                        { src: 'support', label: 'پشتیبانی ۲۴/۷' },
                        { src: 'original-products', label: 'ضمانت اصل بودن' },
                    ].map((item, index) => (
                        <div key={index} className="group flex flex-col items-center gap-4 rounded-2xl cursor-pointer">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-[#D92F4E]/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-[#D92F4E]/50 transition-all duration-300">
                                <Image 
                                    src={`/images/footer/${item.src}.svg`} 
                                    width={99} 
                                    height={99} 
                                    alt={item.label} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                            <span className="text-xs sm:text-sm text-gray-700 font-bold text-center group-hover:text-[#D92F4E] transition-colors">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ۳. بخش پایین: لینک‌ها و مجوزها */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-12">
                    
                    {/* ستون لینک‌های سریع */}
                    <div className="text-center sm:text-right">
                        <h4 className="font-black text-gray-900 mb-6 text-base sm:text-lg">دسترسی سریع به منو</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            {quickLinks.map((link, index) => (
                                <a key={index} href={link.href} className="hover:text-[#D92F4E] transition py-1 block">{link.title}</a>
                            ))}
                        </div>
                    </div>

                    {/* ستون خالی فرضی یا توضیحات کوتاه برای توازن بهتر در دسکتاپ */}
                    <div className="hidden md:flex flex-col text-right pr-6">
                        <h4 className="font-black text-gray-900 mb-4 text-lg">فروشگاه چری یدک</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            بزرگترین مرجع تخصصی تامین و توزیع قطعات یدکی خودروهای چری در کشور. تضمین کیفیت و اصالت کالا اولویت همیشگی ماست.
                        </p>
                    </div>

                </div>

                {/* کپی‌رایت انتهای صفحه */}
                <div className="text-center pt-6 font-medium text-xs sm:text-sm text-gray-400 border-t-2 border-[#D92F4E]/10 mt-12">
                    <p>© ۱۴۰۳. تمامی حقوق برای البرز سی‌ان‌سی محفوظ است.</p>
                </div>
            </div>
        </footer>
    )
}