'use client';

import { useFormik } from 'formik';
import { signupDto, SignupDtoType } from './signup.dto';
import { Input } from '@/components/input';
import { Lock, Mail, UserCog } from 'lucide-react';
import Button from '@/components/button';
import { signupAction } from '@/actions/auth/signup';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formikPropsGenerator } from '@/utils/formik-props-generator';

const initialValues: SignupDtoType = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
};

const Page = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema: signupDto,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                await signupAction(values);

                await signIn('credentials', {
                    username: values.username,
                    password: values.password,
                    redirect: false,
                });

                router.replace(`/${values.username}`);
                toast.success('Account created successfully');
            } catch (err: any) {
                toast.error(err.message);
            }
        },
    });

    return (
        <div className="">
            <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
            <p>Let&apos;s get you started sharing your links!</p>

            <form onSubmit={formik.handleSubmit} className="mt-10 space-y-4">
                <Input
                    label="First Name"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    prefixIcon={<UserCog size={16} />}
                    {...formikPropsGenerator(formik, 'firstName')}
                />
                <Input
                    label="Last Name"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    prefixIcon={<UserCog size={16} />}
                    {...formikPropsGenerator(formik, 'lastName')}
                />
                <Input
                    label="Username"
                    id="username"
                    type="text"
                    placeholder="Your Username"
                    prefixIcon={<UserCog size={16} />}
                    {...formikPropsGenerator(formik, 'username')}
                />
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    prefixIcon={<Mail size={16} />}
                    {...formikPropsGenerator(formik, 'email')}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    prefixIcon={<Lock size={16} />}
                    {...formikPropsGenerator(formik, 'password')}
                />

                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                    className="w-full"
                >
                    Create Account
                </Button>
            </form>

            <p className="mt-10 text-center">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-primary">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default Page;
