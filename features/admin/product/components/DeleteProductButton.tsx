'use client'

import { useState, useTransition } from "react"
import { deleteProductAction } from "@/app/(admin)/admin/(protected)/products/action"

export default function DeleteProductButton({ productId, title }: { productId: number, title: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            const res = await deleteProductAction(productId)
            if (res.success) {
                setIsOpen(false)
            } else {
                alert(res.error)
            }
        })
    }

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer" 
                title="حذف محصول"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 flex flex-col gap-4">
                        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-black text-gray-900">حذف محصول</h3>
                            <p className="text-sm font-medium text-gray-500 mt-2">
                                آیا از حذف محصول <span className="font-bold text-gray-800">«{title}»</span> مطمئن هستید؟ این عملیات قابل بازگشت نیست.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <button
                                disabled={isPending}
                                onClick={() => setIsOpen(false)}
                                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                            >
                                انصراف
                            </button>
                            <button
                                disabled={isPending}
                                onClick={handleDelete}
                                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-rose-600/20 cursor-pointer flex items-center justify-center gap-2"
                            >
                                {isPending ? 'در حال حذف...' : 'حذف شود'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}