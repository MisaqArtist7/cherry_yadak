"use client";

import { useState } from "react";
import Image from "next/image";
import EditCategoryForm from "./EditCategoryForm";
import { deleteCategoryAction } from "../services/category";

type Category = {
    id: number;
    name: string;
    image?: string | null;
    parentId?: number | null;
};

export default function CategoryListManager({ categories }: { categories: Category[] }) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // تابع هندل‌کننده حذف
    const handleDelete = async (id: number, name: string) => {
        const confirmed = window.confirm(`آیا از حذف دسته‌بندی "${name}" مطمئن هستید؟`);
        if (!confirmed) return;

        setDeletingId(id);
        setErrorMessage(null);

        const res = await deleteCategoryAction(id);
        setDeletingId(null);

        if (!res.success) {
            setErrorMessage(res.message);
        }
    };

    return (
        <div className="space-y-4">
            {/* پیام خطا در صورت وجود (مثلاً داشتن فرزند) */}
            {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold flex justify-between items-center">
                    <span>{errorMessage}</span>
                    <button 
                        onClick={() => setErrorMessage(null)} 
                        className="text-rose-400 hover:text-rose-600 font-bold"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* لیست دسته‌ها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => {
                    const parentName = categories.find((c) => c.id === cat.parentId)?.name;
                    const isDeleting = deletingId === cat.id;

                    return (
                        <div
                            key={cat.id}
                            className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/30 hover:border-gray-200 transition-all"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                {cat.image ? (
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">
                                        بدون عکس
                                    </div>
                                )}
                                <div className="truncate">
                                    <p className="font-bold text-xs md:text-sm text-gray-800 truncate">{cat.name}</p>
                                    <p className="text-[10px] text-gray-400 font-medium truncate">
                                        {parentName ? `والد: ${parentName}` : "دسته اصلی"}
                                    </p>
                                </div>
                            </div>

                            {/* دکمه‌های آیکونی ویرایش و حذف */}
                            <div className="flex items-center gap-1 shrink-0 mr-2">
                                {/* دکمه ویرایش (آیکون مداد) */}
                                <button
                                    onClick={() => setEditingCategory(cat)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                    title="ویرایش دسته‌بندی"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                                        />
                                    </svg>
                                </button>

                                {/* دکمه حذف (آیکون سطل زباله) */}
                                <button
                                    onClick={() => handleDelete(cat.id, cat.name)}
                                    disabled={isDeleting}
                                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                                    title="حذف دسته‌بندی"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* مودال پاپ‌آپ برای ویرایش */}
            {editingCategory && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <h3 className="font-bold text-gray-900 text-sm">
                                ویرایش: {editingCategory.name}
                            </h3>
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        <EditCategoryForm
                            category={editingCategory}
                            allCategories={categories}
                            onClose={() => setEditingCategory(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}