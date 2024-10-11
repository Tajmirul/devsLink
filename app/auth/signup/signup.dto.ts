import * as yup from 'yup';

export const signupDto = yup.object().shape({
    firstName: yup.string().required('Name is required'),
    lastName: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export type SignupDtoType = yup.InferType<typeof signupDto>;
