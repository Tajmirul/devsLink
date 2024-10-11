import { del, put } from '@vercel/blob';

export const uploadFile = async (file: File) => {
    const { url } = await put(
        `${process.env.BLOB_FOLDER_NAME}/${Date.now()}-${file.name}`,
        file,
        { access: 'public', contentType: file.type },
    );

    return url;
};

export const deleteFile = async (url: string) => {
    await del(url);
    return true;
};
