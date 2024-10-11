import PhonePreview from '@/components/PhonePreview';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/utils/session';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
import { getLinks } from '@/actions/links';

const Layout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: { username: string };
}) => {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/auth/signin');
    }

    if (user.username !== params.username) {
        return redirect(`/${params.username}`);
    }

    const links = await getLinks(user.id);

    return (
        <>
            <Navbar />

            <section className="mt-4 mb-4">
                <div className="container grid lg:grid-cols-9 gap-4">
                    <div className="lg:col-span-4 max-lg:hidden bg-white px-8 py-10 rounded-2xl flex items-start justify-center">
                        <PhonePreview
                            profilePicture={user.avatar}
                            name={`${user.firstName} ${user.lastName}`}
                            email={user.email}
                            links={links.slice(0, 4)}
                        />
                    </div>
                    <div className="lg:col-span-5 bg-white px-4 md:px-8 py-5 md:py-10 rounded-2xl">
                        {children}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Layout;
