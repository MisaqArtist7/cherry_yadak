"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("یوزرنیم یا پسورد اشتباهه");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* هدر برند، هم‌راستا با استایل بنر تخفیف سایت */}
        <div className="bg-[#D92F4E] rounded-t-3xl px-6 pt-8 pb-14 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -top-8 -right-6 w-24 h-24 rounded-full bg-white/10" />

          <Image src="/images/logo.jpg" width={222} height={222} alt="لوگو" className="mb-3 w-22 h-22" />
          <h1 className="text-white font-bold text-xl">پنل مدیریت</h1>
          <p className="text-white/80 text-sm font-medium mt-1">ورود مخصوص پرسنل فروشگاه</p>
        </div>

        {/* کارت فرم، هم‌سبک با کارت‌های محصول: سفید، سایه ملایم، رادیوس بزرگ */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-3xl rounded-tr-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 -mt-6 px-6 pt-8 pb-6 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-gray-700 font-bold">یوزرنیم</span>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5  text-gray-800 outline-none focus:border-[#D92F4E] focus:ring-2 focus:ring-red-50 transition-colors"
              placeholder="نام کاربری خودتو وارد کن"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-gray-700  font-bold">پسورد</span>
            <input
              type="password"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5  text-gray-800 outline-none focus:border-[#D92F4E] focus:ring-2 focus:ring-red-50 transition-colors"
              placeholder="رمز عبور خودتو وارد کن"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-[#D92F4E] text-sm font-bold px-3 py-2 rounded-lg">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10 6v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="14" r="1" fill="currentColor" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#D92F4E] text-white font-bold  rounded-xl py-3 hover:bg-[#c0273f] active:scale-[0.98] transition-all disabled:opacity-60 disabled:active:scale-100"
          >
            {loading ? "در حال ورود…" : "ورود به پنل"}
          </button>

          <p className="text-center text-xs text-gray-400 font-medium mt-1">
            دسترسی فقط برای پرسنل مجاز فروشگاهه
          </p>
        </form>
      </div>
    </div>
  );
}