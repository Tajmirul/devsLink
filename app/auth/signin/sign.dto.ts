import * as yup from 'yup';

export const signinDto = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

export type SigninDtoType = yup.InferType<typeof signinDto>;
