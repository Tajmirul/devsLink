'use client';

import { useFormik } from 'formik';
import { profileUpdateDto, ProfileUpdateDtoType } from './profile-update.dto';
import { profileUpdateAction } from '@/actions/profile';
import toast from 'react-hot-toast';
import { formikPropsGenerator } from '@/utils/formik-props-generator';
import { Input } from '@/components/input';
import Button from '@/components/button';
import FileInput from '@/components/input/FileInput';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { objectToFormData } from '@/utils/formData';

const initialValues: ProfileUpdateDtoType = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    avatar: '',
};

const Page = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const formik = useFormik({
        initialValues,
        validationSchema: profileUpdateDto,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const res = await profileUpdateAction(objectToFormData(values));

                formik.setFieldValue('avatar', res.avatar);
                toast.success('Your profile is updated');
            } catch (err: any) {
                toast.error(err.message);
            }
        },
    });

    useEffect(() => {
        if (!user) {
            return;
        }

        formik.setValues({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || '',
            email: user.email || '',
            avatar: user.avatar || '',
        });
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        formik.setFieldValue('avatar', e.target.files[0]);
    };

    return (
        <div className="h-full flex flex-col">
            <h1 className="font-bold text-2xl">Profile Details</h1>
            <p className="mt-2 text-black/70">
                Add your details to create a personal touch to your profile.
            </p>

            <form
                onSubmit={formik.handleSubmit}
                className="mt-10 grow flex flex-col"
            >
                <div className="bg-background p-3 md:p-5 rounded-md mb-4">
                    <div className="flex max-md:flex-col md:items-center gap-x-3 gap-y-1">
                        <label
                            htmlFor="avatar"
                            className="grow text-sm text-black/70 whitespace-nowrap"
                        >
                            Profile Picture
                        </label>

                        <div className="w-full max-w-[400px] flex max-md:flex-col md:items-center gap-x-5 gap-y-3">
                            <FileInput
                                value={user?.avatar || undefined}
                                onChange={handleFileChange}
                                classNames={{
                                    container: 'size-[140px]',
                                }}
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                            />
                            <div className="text-[10px]">
                                Image must be below 2MB and 300x300 <br />
                                use PNG, JPG, or WEBP format.
                                <p className="text-rose-500 font-bold text-sm">
                                    {formik.touched.avatar &&
                                        (formik.errors.avatar as string)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-background p-3 md:p-5 rounded-md space-y-4">
                    <div className="flex max-md:flex-col md:items-center gap-x-3 gap-y-1">
                        <label
                            htmlFor="firstName"
                            className="grow text-sm text-black/70 whitespace-nowrap"
                        >
                            First Name
                        </label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            classNames={{
                                container: 'w-full max-w-[400px]',
                                input: 'bg-white',
                            }}
                            {...formikPropsGenerator(formik, 'firstName')}
                        />
                    </div>

                    <div className="flex max-md:flex-col md:items-center gap-x-3 gap-y-1">
                        <label
                            htmlFor="lastName"
                            className="grow text-sm text-black/70 whitespace-nowrap"
                        >
                            Last Name
                        </label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            classNames={{
                                container: 'w-full max-w-[400px]',
                                input: 'bg-white',
                            }}
                            {...formikPropsGenerator(formik, 'lastName')}
                        />
                    </div>

                    <div className="flex max-md:flex-col md:items-center gap-x-3 gap-y-1">
                        <label
                            htmlFor="username"
                            className="grow text-sm text-black/70 whitespace-nowrap"
                        >
                            Username
                        </label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Your Username"
                            classNames={{
                                container: 'w-full max-w-[400px]',
                                input: 'bg-white',
                            }}
                            {...formikPropsGenerator(formik, 'username')}
                        />
                    </div>

                    <div className="flex max-md:flex-col md:items-center gap-x-3 gap-y-1">
                        <label
                            htmlFor="email"
                            className="grow text-sm text-black/70 whitespace-nowrap"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            classNames={{
                                container: 'w-full max-w-[400px]',
                                input: 'bg-white',
                            }}
                            {...formikPropsGenerator(formik, 'email')}
                        />
                    </div>
                </div>

                <div className="flex justify-end items-end grow">
                    <div className="pt-4 mt-8 border-t w-full flex justify-end">
                        <Button
                            type="submit"
                            className="text-sm h-10"
                            isLoading={formik.isSubmitting}
                            disabled={formik.isSubmitting}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Page;
