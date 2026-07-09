'use server'

import prisma  from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { revalidatePath } from "next/cache"

async function getUserId(): Promise<number | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null

    try {
        const payload = verifyToken(token) as { userId: number }
        return payload.userId
    } catch {
        return null
    }
}

export async function getAddresses() {
    const userId = await getUserId()
    if (!userId) return []

    return await prisma.address.findMany({
        where: { userId },
        orderBy: { isDefault: "desc" },
    })
}

export async function createAddress(data: {
    fullName: string
    phone: string
    province: string
    city: string
    postalCode: string
    fullAddress: string
    isDefault?: boolean
}) {
    const userId = await getUserId()
    if (!userId) {
        return { success: false, message: "ابتدا وارد حساب کاربری شوید" }
    }

    // اگه گفت این آدرس پیش‌فرضه، بقیه آدرس‌ها رو از حالت پیش‌فرض دربیار
    if (data.isDefault) {
        await prisma.address.updateMany({
            where: { userId },
            data: { isDefault: false },
        })
    }

    const address = await prisma.address.create({
        data: { ...data, userId },
    })

    revalidatePath("/checkout")
    revalidatePath("/profile/addresses")

    return { success: true, address }
}

export async function deleteAddress(addressId: number) {
    const userId = await getUserId()
    if (!userId) {
        return { success: false, message: "ابتدا وارد حساب کاربری شوید" }
    }

    // مطمئن شو آدرس متعلق به خود همین کاربره (جلوی دستکاری آدرس دیگران رو می‌گیره)
    const address = await prisma.address.findUnique({ where: { id: addressId } })
    if (!address || address.userId !== userId) {
        return { success: false, message: "دسترسی غیرمجاز" }
    }

    await prisma.address.delete({ where: { id: addressId } })

    revalidatePath("/checkout")
    revalidatePath("/profile/addresses")

    return { success: true }
}

export async function setDefaultAddress(addressId: number) {
    const userId = await getUserId()
    if (!userId) {
        return { success: false, message: "ابتدا وارد حساب کاربری شوید" }
    }

    const address = await prisma.address.findUnique({ where: { id: addressId } })
    if (!address || address.userId !== userId) {
        return { success: false, message: "دسترسی غیرمجاز" }
    }

    await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
    })

    await prisma.address.update({
        where: { id: addressId },
        data: { isDefault: true },
    })

    revalidatePath("/checkout")
    revalidatePath("/profile/addresses")

    return { success: true }
}