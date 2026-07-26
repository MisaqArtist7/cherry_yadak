'use client'
import React, { useRef, useState } from "react"
import { createProductAction } from '@/features/admin/product/services/product'

type Category = { 
    id: number
    name: string
    children?: { id: number; name: string }[] 
}
type Brand = { id: number; name: string }

export default function ProductFormPage({ categories, brands }: { categories: Category[], brands: Brand[] }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        const result = await createProductAction(formData)
        setMessage(result.message)
        setIsPending(false)

        if (result.success) {
            formRef.current?.reset()
        }
    }

    return (
        <form 
            ref={formRef} 
            action={handleSubmit} 
            className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm space-y-5"
        >
            {/* نام محصول و موجودی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                        نام محصول
                    </label>
                    <input
                        name='title'
                        type="text"
                        required
                        placeholder="مثلاً: سپر جلو آریزو ۵"
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 outline-none font-medium text-xs md:text-sm text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                        موجودی انبار
                    </label>
                    <input
                        name="stock"
                        type="number"
                        placeholder="مثلاً: ۱۲"
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 outline-none font-medium text-xs md:text-sm text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* قیمت و تخفیف */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                        قیمت (تومان)
                    </label>
                    <input
                        name='price'
                        type="number"
                        required
                        placeholder="مثلاً: ۴۵۰۰۰۰۰۰"
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 outline-none font-bold text-sm md:text-base text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-gray-400 placeholder:font-normal"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                        تخفیف (قیمت)
                    </label>
                    <input
                        name='discount'
                        type="number"
                        placeholder="مثلاً: ۴۵۰۰۰۰"
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 outline-none font-medium text-xs md:text-sm text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* دسته‌بندی و برند */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* دسته‌بندی */}
                <div>
                    <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                        دسته‌بندی
                    </label>
                    <div className="relative">
                        <select 
                            name="categoryId" 
                            required
                            defaultValue=""
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 pl-10 outline-none font-bold text-xs md:text-sm text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-gray-400">انتخاب کنید</option>
                            {categories.map((cat) => (
                                <React.Fragment key={cat.id}>
                                    {/* دسته‌بندی والد (اصلی) */}
                                    <option value={cat.id} className="font-bold text-gray-900 py-1">
                                        {cat.name}
                                    </option>
                                    
                                    {/* زیردسته‌بندی‌های با تورفتگی */}
                                    {cat.children?.map((sub) => (
                                        <option key={sub.id} value={sub.id} className="text-gray-600 font-medium py-1">
                                            {"\u00A0\u00A0\u00A0\u00A0"}- {sub.name}
                                        </option>
                                    ))}
                                </React.Fragment>
                            ))}
                        </select>
                        {/* آیکون فلش */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* برند */}
                <div>
                    <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                        برند
                    </label>
                    <div className="relative">
                        <select 
                            name="brandId"
                            required
                            defaultValue=""
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 pl-10 outline-none font-bold text-xs md:text-sm text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-gray-400">انتخاب کنید</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id} className="font-bold text-gray-800">
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        {/* آیکون فلش */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* تصویر محصول */}
            <div>
                <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                    تصویر محصول
                </label>
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center bg-gray-50/30 hover:border-rose-500 hover:bg-rose-500/5 transition-all duration-200 cursor-pointer group shadow-xs">
                    <input type="file" name="image" accept="image/*" className="hidden" />
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-rose-500 transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-bold text-gray-700 text-xs md:text-sm group-hover:text-rose-500 transition-colors">
                        کلیک کنید یا تصویر را به این بخش بکشید
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5 font-medium">
                        فرمت‌های مجاز: PNG, JPG, WEBP
                    </span>
                </label>
            </div>

            {/* توضیحات */}
            <div>
                <label className="block text-gray-700 font-bold text-xs md:text-sm mb-1.5">
                    توضیحات فنی و اجمالی
                </label>
                <textarea
                    name="description"
                    rows={4}
                    placeholder="مشخصات موتور، ابعاد، توان مصرفی و..."
                    className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 outline-none font-medium text-xs md:text-sm text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all resize-none placeholder:text-gray-400"
                />
            </div>

            {/* پیام نتیجه */}
            {message && (
                <div className={`p-3.5 rounded-xl font-bold text-xs md:text-sm border ${
                    message.includes('موفقیت') 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' 
                        : 'bg-rose-50 text-rose-600 border-rose-200/80'
                }`}>
                    {message}
                </div>
            )}

            {/* دکمه ثبت */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-(--primaryColor) text-white px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-(--hoverColor) transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                    {isPending ? 'در حال ثبت...' : 'ذخیره و ثبت محصول'}
                </button>
            </div>
        </form>
    )
}