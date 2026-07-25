"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
    >
      {/* هاله نور پس‌زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-125 h-96 sm:h-125 bg-[#D92F4E]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* هدر برند */}
        <div className="bg-linear-to-br from-[#E83B5B] to-[#B8223D] rounded-t-3xl px-6 sm:px-8 pt-8 sm:pt-10 pb-12 sm:pb-14 flex flex-col items-center text-center relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/10 blur-sm" />
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-sm" />

          {/* آیکون بالای عنوان */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-white border border-white/20 shadow-inner">
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-white text-2xl sm:text-3xl tracking-tight">
            پنل مدیریت
          </h1>
          <p className="text-white/85 text-lg mt-1.5 sm:mt-2">
            ورود اختصاصی پرسنل فروشگاه
          </p>
        </div>

        {/* کارت فرم */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl -mt-6 px-6 sm:px-8 pt-8 sm:pt-9 pb-7 sm:pb-8 flex flex-col gap-5 sm:gap-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-xl text-gray-800">
              نام کاربری:
            </span>
            <input
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 sm:px-5 py-3.5 sm:py-4 sm:text-lg text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 placeholder:text-gray-400 text-lg"
              placeholder="نام کاربری خود را وارد کنید"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xl text-gray-800">
              رمز عبور:
            </span>
            <input
              type="password"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 sm:px-5 py-3.5 sm:py-4 text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 placeholder:text-gray-400 text-lg"
              placeholder="رمز عبور خود را وارد کنید"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-[#D92F4E]  font-bold px-4 py-3 rounded-2xl">
              <svg
                className="w-5 h-5 shrink-0"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 6v5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="14" r="1" fill="currentColor" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 sm:mt-2 text-xl w-full bg-linear-to-r from-[#D92F4E] to-[#B8223D] text-white font-extrabold rounded-2xl py-3.5 sm:py-4 shadow-lg shadow-[#D92F4E]/30 hover:shadow-xl hover:shadow-[#D92F4E]/40 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>در حال بررسی…</span>
              </>
            ) : (
              "ورود به پنل"
            )}
          </button>

          <p className="text-center text-gray-400 text-lg">
            دسترسی فقط برای پرسنل مجاز فروشگاه می‌باشد
          </p>
        </form>
      </div>
    </div>
  );
}