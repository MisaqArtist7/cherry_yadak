// app/actions/auth.ts
'use server'

import prisma from "@/lib/prisma"
import { signToken } from "@/lib/jwt"
import { cookies } from "next/headers"

export async function loginOrRegister(phone: string, fullName?: string) {
    if (!phone) {
        return { success: false, message: "شماره تلفن الزامی است" }
    }

    let user = await prisma.user.findUnique({ where: { phone } })
    
    if (!user) {
        if (!fullName) {
            return { success: false, message: "کاربر یافت نشد، نام کامل را وارد کنید" }
        }
        user = await prisma.user.create({ data: { phone, fullName } })
    }

    const token = signToken({ userId: user.id, phone: user.phone, role: user.role })

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })

    return { success: true, user: { id: user.id, fullName: user.fullName, phone: user.phone } }
}