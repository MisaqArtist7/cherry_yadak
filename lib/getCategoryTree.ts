import prisma from '@/lib/prisma'

export async function getAllSubCategoryIds(categoryId: number): Promise<number[]> {
    const children = await prisma.categories.findMany({
        where: { parentId: categoryId },
        select: { id: true },
    })

    if (children.length === 0) return []

    const childIds = children.map((c) => c.id)

    const nestedIds = await Promise.all(
        childIds.map((id) => getAllSubCategoryIds(id))
    )

    return [...childIds, ...nestedIds.flat()]
}