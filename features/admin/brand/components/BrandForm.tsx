export default function BrandForm() {
    return (
        <form action='' className="space-y-6">
            <div>
                <label className="block font-bold mb-2 text-gray-700">نام برند:</label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="مثال: داهوا"
                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                />
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-50">
                <button
                    type="submit"
                    className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer disabled:opacity-50"
                >
                    ثبت برند
                </button>
            </div>
        </form>
    )
}
