// lib/cart.ts
import  prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { randomUUID } from "crypto"

const CART_COOKIE = "cart_session"

async function getUserIdFromToken(): Promise<number | null> {
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

export async function getOrCreateCart() {
    const cookieStore = await cookies()
    const userId = await getUserIdFromToken()

    if (userId) {
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: { images: true },
                        },
                    },
                },
            },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: { images: true },
                            },
                        },
                    },
                },
            })
        }

        return cart
    }

    let sessionId = cookieStore.get(CART_COOKIE)?.value

    if (!sessionId) {
        sessionId = randomUUID()
        cookieStore.set(CART_COOKIE, sessionId, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        })
    }

    let cart = await prisma.cart.findUnique({
        where: { sessionId },
        include: {
            items: {
                include: {
                    product: {
                        include: { images: true },
                    },
                },
            },
        },
    })

    if (!cart) {
        cart = await prisma.cart.create({
            data: { sessionId },
            include: {
                items: {
                    include: {
                        product: {
                            include: { images: true },
                        },
                    },
                },
            },
        })
    }

    return cart
}