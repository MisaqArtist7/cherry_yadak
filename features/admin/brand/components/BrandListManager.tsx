// features/admin/brand/components/BrandListManager.tsx
'use client'

import React, { useState } from 'react'
import { updateBrandAction, deleteBrandAction } from '../services/brandAction'

type Brand = {
    id: number
    name: string
    slug: string
}

export default function BrandListManager({ brands }: { brands: Brand[] }) {
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
    const [isPending, setIsPending] = useState(false)
    const [message, setMessage] = useState('')

    // ویرایش برند
    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!editingBrand) return

        setIsPending(true)
        const formData = new FormData(e.currentTarget)
        const result = await updateBrandAction(editingBrand.id, formData)
        
        setMessage(result.message)
        setIsPending(false)

        if (result.success) {
            setEditingBrand(null)
        }
    }

    // حذف برند
    async function handleDelete(id: number) {
        if (!confirm('آیا از حذف این برند اطمینان دارید؟')) return

        setIsPending(true)
        const result = await deleteBrandAction(id)
        alert(result.message)
        setIsPending(false)
    }

    return (
        <div className="space-y-4">
            {/* لیست جدول برندها */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                        <tr>
                            <th className="p-3.5">شناسه</th>
                            <th className="p-3.5">نام برند</th>
                            <th className="p-3.5">اسلاگ</th>
                            <th className="p-3.5 text-center">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center p-6 text-gray-400">
                                    هنوز هیچ برندی ثبت نشده است.
                                </td>
                            </tr>
                        ) : (
                            brands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-3.5 font-bold text-gray-400">{brand.id}</td>
                                    <td className="p-3.5 font-bold text-gray-900">{brand.name}</td>
                                    <td className="p-3.5 text-gray-500 dir-ltr text-right">{brand.slug}</td>
                                    <td className="p-3.5 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            {/* آیکون ویرایش */}
                                            <button
                                                onClick={() => {
                                                    setMessage('')
                                                    setEditingBrand(brand)
                                                }}
                                                title="ویرایش"
                                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>

                                            {/* آیکون حذف */}
                                            <button
                                                onClick={() => handleDelete(brand.id)}
                                                disabled={isPending}
                                                title="حذف"
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* مدال ویرایش برند */}
            {editingBrand && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-gray-100">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="font-bold text-gray-900">ویرایش برند: {editingBrand.name}</h3>
                            <button
                                onClick={() => setEditingBrand(null)}
                                className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                    نام برند
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingBrand.name}
                                    required
                                    className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-rose-500"
                                />
                            </div>

                            {message && (
                                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg">
                                    {message}
                                </p>
                            )}

                            <div className="flex justify-end gap-2 pt-2 border-t">
                                <button
                                    type="button"
                                    onClick={() => setEditingBrand(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 cursor-pointer"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 cursor-pointer disabled:opacity-50"
                                >
                                    {isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}