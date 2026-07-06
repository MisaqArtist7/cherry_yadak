import Image from "next/image"

export default function FooterComponent() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-4">
            <div className="container mx-auto px-6 pt-16 pb-8">
                
                {/* ۱. بخش بالایی: لوگو و تماس (بزرگتر و واضح‌تر) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-7 border-b-2 border-[#D92F4E]/10">
                    <Image src='/images/logo.svg' width={180} height={60} alt="logo" className="h-12 w-auto"/>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">تلفن پشتیبانی:</span>
                            <span className="text-xl font-black text-[#D92F4E] tracking-tight">۰۲۱-۶۱۹۳۰۰۰۰</span>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-gray-200"></div>
                        <span className="text-sm font-medium text-gray-400">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
                    </div>
                </div>

                {/* ۲. بخش ویژگی‌ها (کارت‌های جذاب‌تر) */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-5">
                    {[
                        { src: 'express-delivery', label: 'تحویل اکسپرس' },
                        { src: 'cash-on-delivery', label: 'پرداخت در محل' },
                        { src: 'support', label: 'پشتیبانی ۲۴/۷' },
                        { src: 'days-return', label: '۷ روز ضمانت بازگشت' },
                        { src: 'original-products', label: 'ضمانت اصل بودن' },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-5 rounded-2xl">
                            <div className="w-22 h-22 bg-white border border-[#D92F4E]/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Image src={`/images/footer/${item.src}.svg`} width={99} height={99} alt={item.label} className="w-16 h-16"/>
                            </div>
                            <span className="text-sm text-gray-700 font-bold">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* ۳. بخش پایین: لینک‌ها و خبرنامه (چیدمان گسترده) */}
                <div className="grid lg:grid-cols-4 gap-12 pt-12 border-t border-gray-100">
                    
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-black text-gray-900 mb-6 text-lg">دسترسی سریع</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            {['همه محصولات', 'شگفت‌انگیزها', 'پرفروش‌ترین‌ها', 'درباره ما', 'تماس با ما', 'قوانین خرید'].map((link) => (
                                <a key={link} href="#" className="hover:text-[#D92F4E] transition py-1">{link}</a>
                            ))}
                        </div>
                    </div>

                    {/* ستون مجوزها */}
                    <div className="flex flex-col items-center justify-center lg:items-start">
                        <h4 className="font-black text-gray-900 mb-6 text-lg">مجوزها</h4>
                        <div className="flex gap-4">
                            <div className="w-28 h-28 bg-white shadow-lg shadow-gray-100 rounded-2xl border border-gray-100 flex items-center justify-center hover:scale-105 transition-transform">
                                <span className="text-[10px] text-gray-400 font-bold">اینماد</span>
                            </div>
                            <div className="w-28 h-28 bg-white shadow-lg shadow-gray-100 rounded-2xl border border-gray-100 flex items-center justify-center hover:scale-105 transition-transform">
                                <span className="text-[10px] text-gray-400 font-bold">کسب‌وکار</span>
                            </div>
                        </div>
                    </div>

                    {/* ستون خبرنامه */}
                    <div className="col-span-2 font-medium">
                        <h4 className="font-black text-gray-900 mb-4 text-lg">عضویت در خبرنامه</h4>
                        <p className=" text-gray-500 mb-6 leading-6">با عضویت در خبرنامه از جدیدترین محصولات و تخفیف‌ها باخبر شوید.</p>
                        <div className="flex gap-2 max-w-md">
                            <input type="email" placeholder="ایمیل خود را وارد کنید" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#D92F4E]/20" />
                            <button className="bg-[#D92F4E] text-white px-8 rounded-xl font-bold transition shadow-lg shadow-[#D92F4E]/30">عضویت</button>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-6 font-medium text-sm text-gray-400 border-t-2 border-[#D92F4E]/10 mt-12">
                    <p>© ۱۴۰۳. تمامی حقوق برای البرز سی‌ان‌سی محفوظ است.</p>
                </div>
            </div>
        </footer>
    )
}