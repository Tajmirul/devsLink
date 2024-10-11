'use server';

import {
    profileUpdateDto,
    ProfileUpdateDtoType,
} from '@/app/[username]/(authWrapper)/edit/profile-update.dto';
import prisma from '@/prisma/client';
import { deleteFile, uploadFile } from '@/utils/file-manager';
import { formDataToObject } from '@/utils/formData';
import { revalidatePath } from 'next/cache';

export const profileUpdateAction = async (id: string, data: FormData) => {
    const dataObj = formDataToObject(data) as ProfileUpdateDtoType & {
        avatar: File;
    };

    await profileUpdateDto.validate(dataObj);

    // check if user exists
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error('User not found');
    }

    // upload the new file to vercel
    let newAvatarUrl;

    if (dataObj.avatar instanceof File) {
        newAvatarUrl = await uploadFile(dataObj.avatar);
    }

    // if new file uploaded and previous file exists, delete old file
    if (dataObj.avatar instanceof File && user.avatar) deleteFile(user.avatar);

    // Update user profile
    const newUser = await prisma.user.update({
        where: { id },
        data: {
            ...dataObj,
            avatar: newAvatarUrl,
        },
    });

    revalidatePath('/[username]/(authWrapper)', 'layout');

    return newUser;
};
