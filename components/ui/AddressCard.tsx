'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteAddress, setDefaultAddress } from "@/action/address"

type AddressCardProps = {
    address: {
        id: number
        fullName: string
        phone: string
        province: string
        city: string
        postalCode: string
        fullAddress: string
        isDefault: boolean
    }
}

export default function AddressCard({ address }: AddressCardProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        if (!confirm("آیا از حذف این آدرس مطمئن هستید؟")) return

        setLoading(true)
        await deleteAddress(address.id)
        router.refresh()
        setLoading(false)
    }

    async function handleSetDefault() {
        setLoading(true)
        await setDefaultAddress(address.id)
        router.refresh()
        setLoading(false)
    }

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm shadow-gray-100/50 flex flex-col justify-between gap-6 hover:border-gray-200 transition-all">
            
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="font-black text-gray-900 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${address.isDefault ? 'bg-[#D92F4E]' : 'bg-gray-400'}`}></span>
                        {address.isDefault ? "آدرس پیش‌فرض" : `${address.province}، ${address.city}`}
                    </h3>
                    
                    <div className="flex items-center gap-1">
                        {!address.isDefault && (
                            <button
                                onClick={handleSetDefault}
                                disabled={loading}
                                className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                                title="انتخاب به‌عنوان پیش‌فرض"
                            >
                                <svg className="w-4 h-4"><use href="#check-circle"></use></svg>
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="p-2 text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                            title="حذف نشانی"
                        >
                            <svg className="w-4 h-4"><use href="#trash-icon"></use></svg>
                        </button>
                    </div>
                </div>

                <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-bold">نشانی دقیق محل شما :</span>
                    <p className="text-gray-600 leading-6 font-medium pl-4">{address.fullAddress}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50/50 rounded-2xl p-4 font-bold text-gray-500">
                <div className="space-y-1">
                    <span className="block text-[10px] text-gray-400">کد پستی مقصد</span>
                    <span className="text-gray-800 font-mono" dir="ltr">{address.postalCode}</span>
                </div>
                <div className="space-y-1">
                    <span className="block text-[10px] text-gray-400">تحویل‌گیرنده بار</span>
                    <span className="text-gray-800">{address.fullName}</span>
                </div>
                <div className="space-y-1 col-span-2 border-t border-gray-100/70 pt-2 mt-1">
                    <span className="text-[10px] text-gray-400 ml-1">شماره هماهنگی تحویل:</span>
                    <span className="text-gray-700 font-mono" dir="ltr">{address.phone}</span>
                </div>
            </div>

        </div>
    )
}