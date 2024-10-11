'use client';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

const Page = () => {
    useLayoutEffect(() => {
        signOut({
            redirect: false,
        });
        redirect('/auth/signin');
    }, []);

    return <></>;
};

export default Page;
