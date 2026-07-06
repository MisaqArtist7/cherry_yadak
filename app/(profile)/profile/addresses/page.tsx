import Link from "next/link"
import Image from "next/image"

export default function AddressesPage() {
    // مشخصات اصلی و آدرس ثابت خود مشتری
    const customerProfileAddress = {
        name: "میثاق باباخانی",
        phone: "۰۹۱۲۳۴۵۶۷۸۹",
        postalCode: "۱۴۵۱۷۸۹۶۳۲",
        mainAddress: "تهران، پونک، خیابان مخبری، پلاک ۴۵، طبقه ۳، واحد ۶"
    };

    // سایر آدرس‌های ثبت‌شده برای ارسال بار (محل پروژه‌ها یا کارگاه‌ها)
    const clientAddresses = [
        { id: 1, title: "نشانی اصلی و اطلاعات حساب مشتری", address: "تهران، شهرک صنعتی شمس‌آباد، بلوار گلستان، خیابان گل سرخ، پلاک ۱۲، سوله سوم", postalCode: "۱۳۹۴۸۵۷۱۱۲", receiver: "میثاق باباخانی", phone: "۰۹۱۲۳۴۵۶۷۸۹" },
    ];

    return (
        <>
            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold">         
                {/* سایدبار مشتری */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                            <Image src='/images/admin.jpg' fill alt="تصویر پروفایل مشتری" className="object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                            <span className=" font-bold text-gray-400 block mt-1">به پنل کاربری خوش آمدید!</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {[
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
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl  font-bold transition-all duration-200 group ${
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
                    
                    {/* باکس عنوان و دکمه افزودن آدرس */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-xl font-black text-gray-900">آدرس‌های تحویل سفارش</h1>
                            <p className=" text-gray-400 mt-1 font-medium">محل‌های ارسال بار و تخلیه تجهیزات خود را مشخص کنید</p>
                        </div>
                        <button className="bg-[#D92F4E] text-white px-5 py-3 rounded-xl  font-bold hover:bg-[#b8253f] transition-colors shadow-md shadow-[#D92F4E]/10 flex items-center gap-2 cursor-pointer">
                            <svg className="w-4 h-4"><use href="#plus-circle"></use></svg>
                            افزودن آدرس جدید
                        </button>
                    </div>

                    {/* گرید سایر آدرس‌ها و محل‌های تحویل بار */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        
                        {/* لیست آدرس‌های فرعی مشتری */}
                        {clientAddresses.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm shadow-gray-100/50 flex flex-col justify-between gap-6 hover:border-gray-200 transition-all">
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                                        <h3 className="font-black text-gray-900  flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                            {item.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-1">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer" title="ویرایش نشانی">
                                                <svg className="w-4 h-4"><use href="#pencil-icon"></use></svg>
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 rounded-xl transition-colors cursor-pointer" title="حذف نشانی">
                                                <svg className="w-4 h-4"><use href="#trash-icon"></use></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <span className="text-[10px] text-gray-400 block font-bold">نشانی دقیق محل شما :</span>
                                        <p className=" text-gray-600 leading-6 font-medium pl-4">{item.address}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-gray-50/50 rounded-2xl p-4  font-bold text-gray-500">
                                    <div className="space-y-1">
                                        <span className="block text-[10px] text-gray-400">کد پستی مقصد</span>
                                        <span className="text-gray-800 font-mono" dir="ltr">{item.postalCode}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-[10px] text-gray-400">تحویل‌گیرنده بار</span>
                                        <span className="text-gray-800 ">{item.receiver}</span>
                                    </div>
                                    <div className="space-y-1 col-span-2 border-t border-gray-100/70 pt-2 mt-1">
                                        <span className="text-[10px] text-gray-400 ml-1">شماره هماهنگی تحویل:</span>
                                        <span className="text-gray-700 font-mono" dir="ltr">{item.phone}</span>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>
        </>
    )
}