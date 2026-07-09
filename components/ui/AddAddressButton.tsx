'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createAddress } from "@/action/address"

export default function AddAddressButton() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        province: "",
        city: "",
        postalCode: "",
        fullAddress: "",
        isDefault: false,
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const result = await createAddress(form)

        setLoading(false)

        if (!result.success) {
            setError(result.message ?? "خطایی رخ داد")
            return
        }

        setOpen(false)
        setForm({
            fullName: "", phone: "", province: "", city: "",
            postalCode: "", fullAddress: "", isDefault: false,
        })
        router.refresh()
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-[#D92F4E] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#b8253f] transition-colors shadow-md shadow-[#D92F4E]/10 flex items-center gap-2 cursor-pointer"
            >
                <svg className="w-4 h-4"><use href="#plus-circle"></use></svg>
                افزودن آدرس جدید
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-lg text-gray-900">افزودن آدرس جدید</h2>
                            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                placeholder="نام تحویل‌گیرنده"
                                required
                                value={form.fullName}
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D92F4E]"
                            />
                            <input
                                type="tel"
                                placeholder="شماره تماس"
                                required
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D92F4E]"
                                dir="ltr"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="استان"
                                    required
                                    value={form.province}
                                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D92F4E]"
                                />
                                <input
                                    type="text"
                                    placeholder="شهر"
                                    required
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D92F4E]"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="کد پستی"
                                required
                                value={form.postalCode}
                                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D92F4E]"
                                dir="ltr"
                            />
                            <textarea
                                placeholder="آدرس دقیق پستی"
                                required
                                value={form.fullAddress}
                                onChange={(e) => setForm({ ...form, fullAddress: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#D92F4E] resize-none"
                            />
                            <label className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                <input
                                    type="checkbox"
                                    checked={form.isDefault}
                                    onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                                />
                                این آدرس به‌عنوان پیش‌فرض تنظیم شود
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D92F4E] text-white py-3.5 rounded-xl font-bold hover:bg-[#b8253f] transition-all disabled:opacity-60"
                            >
                                {loading ? "در حال ذخیره..." : "ذخیره آدرس"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}