"use client";

import { useState } from "react";
import Image from "next/image";
// 🟢 ۱. ایمپورت درست تابع ویرایش
import { updateCategoryAction } from "../services/category";

type CategoryItem = {
    id: number;
    name: string;
    image?: string | null;
    parentId?: number | null;
};

interface EditCategoryFormProps {
    category: CategoryItem;
    allCategories: CategoryItem[];
    onClose?: () => void;
}

export default function EditCategoryForm({ category, allCategories, onClose }: EditCategoryFormProps) {
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [previewImage, setPreviewImage] = useState<string>(category.image || "");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        setMessage(null);

        // 🟢 ۲. فراخوانی اکشن ویرایش با id و formData
        const res = await updateCategoryAction(category.id, formData);
        setIsPending(false);

        if (res.success) {
            setMessage({ type: "success", text: res.message });
            if (onClose) {
                setTimeout(onClose, 1000);
            }
        } else {
            setMessage({ type: "error", text: res.message });
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4 text-right">
            {/* 🟢 ۳. قرار دادن hidden input برای آی‌دی */}
            <input type="hidden" name="categoryId" value={category.id} />

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">نام دسته‌بندی</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={category.name}
                    required
                    className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 text-sm font-medium outline-none focus:border-[#D92F4E] transition-all"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">دسته‌بندی والد</label>
                <select
                    name="parentId"
                    defaultValue={category.parentId ?? ""}
                    className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-2.5 text-sm font-medium text-gray-800 outline-none focus:border-[#D92F4E] cursor-pointer"
                >
                    <option value="">اصلی (بدون والد)</option>
                    {allCategories
                        .filter((c) => c.id !== category.id)
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">تصویر دسته‌بندی</label>
                <div className="flex items-center gap-3 mt-1">
                    {previewImage && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                            <Image src={previewImage} alt="پیش‌نمایش" fill className="object-cover" />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-[#D92F4E] hover:file:bg-rose-100 cursor-pointer"
                    />
                </div>
            </div>

            {message && (
                <div
                    className={`p-2.5 rounded-xl text-xs font-bold ${
                        message.type === "success"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                        انصراف
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#D92F4E] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#b92742] transition-all disabled:opacity-50 cursor-pointer"
                >
                    {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
            </div>
        </form>
    );
}