import * as yup from 'yup';

export const profileUpdateDto = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    // max size 2MB, allowed formats: jpg, jpeg, png, webp
    avatar: yup
        .mixed()
        .nullable()
        .test('fileSize', 'File too large', (value) => {
            if (!(value instanceof File)) return true;
            return (value as File).size <= 2 * 1024 * 1024;
        })
        .test('fileFormat', 'Unsupported Format', (value) => {
            if (!(value instanceof File)) return true;
            return [
                'image/jpg',
                'image/jpeg',
                'image/png',
                'image/webp',
            ].includes((value as File).type);
        }),
});

export type ProfileUpdateDtoType = yup.InferType<typeof profileUpdateDto>;