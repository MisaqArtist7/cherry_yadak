// components/admin/CategoryForm.tsx
'use client'

import React, { useRef, useState } from 'react'
import { createCategoryAction } from '@/features/admin/category/services/category'

type Category = { 
    id: number
    name: string
    children?: { id: number; name: string }[] 
}

export default function CategoryForm({ categories }: { categories: Category[] }) {
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        const result = await createCategoryAction(formData)
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
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/50 space-y-6"
        >

            {/* نام دسته‌بندی و نامک سئو */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-slate-700 font-bold text-base md:text-lg mb-2">
                        نام دسته‌بندی
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="مثلاً: قطعات موتوری"
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl p-4 outline-none font-bold text-base md:text-lg text-slate-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all placeholder:text-slate-400 placeholder:font-medium"
                    />
                </div>
                {/* <div>
                    <label className="block text-slate-700 font-bold text-base md:text-lg mb-2">
                        نامک در URL (Slug - انگلیسی)
                    </label>
                    <input
                        type="text"
                        name="slug"
                        required
                        placeholder="for example: engine-parts"
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl p-4 outline-none font-bold text-base md:text-lg text-slate-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all text-left placeholder:text-slate-400 placeholder:font-medium"
                    />
                </div> */}
            </div>

            {/* انتخاب دسته‌بندی مادر (دقیقاً بر اساس منطق فرم محصول) */}
            <div>
                <label className="block text-slate-700 font-bold text-base md:text-lg mb-2">
                    دسته‌بندی مادر (والد)
                </label>
                <div className="relative">
                    <select
                        name="parentId"
                        defaultValue=""
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl p-4 pl-12 outline-none font-bold text-base md:text-lg text-slate-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all appearance-none cursor-pointer"
                    >
                        <option value="" className="font-bold text-slate-800">
                            خودش دسته‌بندی اصلی باشد (بدون والد)
                        </option>

                        {categories.map((cat) => (
                            <React.Fragment key={cat.id}>
                                {/* دسته‌بندی والد (اصلی) */}
                                <option value={cat.id} className="font-black text-slate-900 py-1.5">
                                    {cat.name}
                                </option>

                                {/* زیردسته‌بندی‌های با تورفتگی */}
                                {cat.children?.map((sub) => (
                                    <option key={sub.id} value={sub.id} className="text-slate-600 font-bold py-1">
                                        {"\u00A0\u00A0\u00A0\u00A0"}- {sub.name}
                                    </option>
                                ))}
                            </React.Fragment>
                        ))}
                    </select>

                    {/* آیکون فلش */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <p className="text-slate-400 font-medium text-xs md:text-sm mt-2 mr-1">
                    اگر می‌خواهید این آیتم زیرمجموعه یک بخش دیگر باشد، والد آن را انتخاب کنید.
                </p>
            </div>

            {/* تصویر یا آیکون دسته‌بندی */}
            <div>
                <label className="block text-slate-700 font-bold text-base md:text-lg mb-2">
                    تصویر یا آیکون دسته‌بندی
                </label>
                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/30 hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 transition-all duration-200 cursor-pointer group shadow-sm">
                    <input type="file" name="image" accept="image/*" className="hidden" />
                    <svg className="w-10 h-10 text-slate-400 group-hover:text-[#D92F4E] transition-colors mb-3">
                        <use href="#plus-circle"></use>
                    </svg>
                    <span className="font-extrabold text-slate-700 text-base md:text-lg group-hover:text-[#D92F4E] transition-colors">
                        آیکون منو یا تصویر این دسته‌بندی را آپلود کنید
                    </span>
                    <span className="text-xs md:text-sm text-slate-400 mt-1 font-medium">
                        فرمت‌های مجاز: PNG, JPG, WEBP
                    </span>
                </label>
            </div>

            {/* پیام نتیجه */}
            {message && (
                <div className={`p-5 rounded-2xl font-bold text-base md:text-lg border shadow-sm ${
                    message.includes('موفقیت') 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' 
                        : 'bg-rose-50 text-rose-600 border-rose-200/80'
                }`}>
                    {message}
                </div>
            )}

            {/* دکمه ثبت */}
            <div className="flex justify-end pt-6 border-t border-slate-100">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#D92F4E] text-white px-8 py-4 rounded-2xl text-base md:text-lg font-black hover:bg-[#b92742] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-[#D92F4E]/20 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                    {isPending ? 'در حال ثبت...' : 'ساخت دسته‌بندی'}
                </button>
            </div>

        </form>
    )
}