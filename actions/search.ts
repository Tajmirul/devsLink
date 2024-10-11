'use server';

import prisma from '@/prisma/client';

export const searchUser = async (username: string) => {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    username: {
                        contains: username,
                        mode: 'insensitive',
                    },
                },
                {
                    email: {
                        contains: username,
                        mode: 'insensitive',
                    },
                },
                {
                    firstName: {
                        contains: username,
                        mode: 'insensitive',
                    },
                },
                {
                    lastName: {
                        contains: username,
                        mode: 'insensitive',
                    },
                },
            ],
        },
        take: 5,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
        },
    });

    return users;
};
