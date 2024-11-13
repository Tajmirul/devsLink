'use server';
import { linkUpdateDto } from '@/app/[username]/(authWrapper)/links/link-update.dto';
import prisma from '@/prisma/client';
import { authCheck } from '@/utils/authCheck';
import { getCurrentUser } from '@/utils/session';
import { PlatformType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getLinks = async (userId: string) => {
    return await prisma.link.findMany({
        where: {
            userId,
        },
        orderBy: {
            order: 'asc',
        },
    });
};

export const updateLinksAction = async (
    links: {
        id?: string;
        platform: PlatformType;
        url: string;
        order: number;
    }[],
) => {
    await authCheck();
    const user = await getCurrentUser();

    await linkUpdateDto.validate({ links }, { abortEarly: false });

    // delete all links of the user that has id but not in the new links
    const linksToDelete = links
        .filter((link) => Boolean(link.id))
        .map((link) => link.id!);

    await prisma.link.deleteMany({
        where: {
            userId: user!.id,
            NOT: {
                id: {
                    in: linksToDelete,
                },
            },
        },
    });

    // update the links that have id and in the new links
    await Promise.all(
        links
            .filter((link) => link.id)
            .map((link) =>
                prisma.link.update({
                    where: {
                        id: link.id,
                    },
                    data: {
                        platform: link.platform,
                        url: link.url,
                        order: link.order,
                    },
                }),
            ),
    );

    // insert the links that do not have id
    await prisma.link.createMany({
        data: links
            .filter((link) => !link.id)
            .map((link) => ({
                userId: user!.id,
                platform: link.platform,
                url: link.url,
                order: link.order,
            })),
    });

    revalidatePath('/[username]/(authWrapper)', 'layout');

    return await getLinks(user!.id);
};
