// components/admin/CategoryForm.tsx
'use client'

import { useRef, useState } from 'react'
import { createCategoryAction } from '@/features/admin/category/services/category'

type Category = { id: number; name: string }

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
        <form ref={formRef} action={handleSubmit} className="space-y-6">

            {/* ردیف ۱: نام دسته‌بندی و نامک سئو */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-bold mb-2 text-gray-700">نام دسته‌بندی</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="مثلاً: قطعات یدکی CNC"
                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2 text-gray-700">نامک در URL (Slug - انگلیسی)</label>
                    <input
                        type="text"
                        name="slug"
                        required
                        placeholder="for example: cnc-spare-parts"
                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all text-left"
                    />
                </div>
            </div>

            {/* ردیف ۲: انتخاب دسته‌بندی مادر */}
            <div>
                <label className="block font-bold mb-2 text-gray-700">دسته‌بندی مادر (والد)</label>
                <select
                    name="parentId"
                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all appearance-none cursor-pointer"
                >
                    <option value="">خودش دسته‌بندی اصلی باشد (بدون والد)</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <p className="text-gray-400 mt-1.5 mr-1">اگر می‌خواهید این آیتم زیرمجموعه یک بخش دیگر باشد، والد آن را انتخاب کنید.</p>
            </div>

            {/* ردیف ۳: تصویر دسته‌بندی */}
            <div>
                <label className="block font-bold mb-2 text-gray-700">تصویر دسته بندی</label>
                <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-[#D92F4E]/40 transition-all cursor-pointer group">
                    <input type="file" name="image" accept="image/*" className="hidden" />
                    <svg className="w-10 h-10 text-gray-400 group-hover:text-[#D92F4E] transition-colors mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-bold text-gray-500 group-hover:text-[#D92F4E] transition-colors">آیکون منو یا تصویر این دسته‌بندی را آپلود کنید</span>
                    <span className="text-gray-400 mt-1">ابعاد پیشنهادی استاندارد: 512x512 پیکسل</span>
                </label>
            </div>

            {message && (
                <p className={`text-sm font-bold ${message.includes('موفقیت') ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {message}
                </p>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-50">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer disabled:opacity-50"
                >
                    {isPending ? 'در حال ثبت...' : 'ساخت دسته‌بندی'}
                </button>
            </div>

        </form>
    )
}