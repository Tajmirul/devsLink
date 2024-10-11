'use server';

import bcrypt from 'bcryptjs';
import { signupDto, SignupDtoType } from '@/app/auth/signup/signup.dto';
import prisma from '@/prisma/client';

export const signupAction = async (data: SignupDtoType) => {
    await signupDto.validate(data);

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { username: data.username }],
        },
    });

    if (user?.email === data.email) {
        throw new Error('Email already in use');
    }
    if (user?.username === data.username) {
        throw new Error('Username not available');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    const newUser = await prisma.user.create({
        data: {
            ...data,
            password: hash,
        },
        select: {
            id: true,
            username: true,
            email: true,
        },
    });

    return newUser;
};
