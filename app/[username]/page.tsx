import Button from '@/components/button';
import DevlinksLogoLg from '@/components/icons/DevlinksLogoLg';
import DevLinksLogoSm from '@/components/icons/DevLinksLogoSm';
import SocialIcons from '@/components/SocialIcons';
import prisma from '@/prisma/client';
import { getCurrentUser } from '@/utils/session';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

const page = async ({ params }: { params: { username: string } }) => {
    const authUser = await getCurrentUser();

    const user = await prisma.user.findUnique({
        where: {
            username: params.username,
        },
        include: {
            links: true,
        },
    });

    if (!user) {
        return notFound();
    }

    return (
        <div className="relative">
            <nav className="relative z-[1] pt-4 px-4">
                <div className="container bg-white py-4 px-5 rounded-xl flex items-center justify-between">
                    {authUser?.id === user.id ? (
                        <Button
                            variant="outline"
                            as="link"
                            href={`/${user.username}/links`}
                        >
                            Back to Editor
                        </Button>
                    ) : (
                        <>
                            <span className="max-sm:hidden">
                                <DevlinksLogoLg />
                            </span>
                            <span className="sm:hidden">
                                <DevLinksLogoSm />
                            </span>
                        </>
                    )}
                    <Button
                        variant="primary"
                        copy={`${process.env.NEXT_PUBLIC_URL}/${user.username}`}
                    >
                        Share Link
                    </Button>
                </div>
            </nav>

            <div className="absolute left-0 top-0 z-[-1] h-[300px] w-full bg-primary rounded-b-[40px]"></div>

            <div className="max-w-[300px] mx-auto bg-white shadow-lg rounded-xl mt-20 p-4 md:p-7 lg:p-10 mb-10">
                <Image
                    className="size-[100px] rounded-full border-4 border-primary mx-auto"
                    src={user.avatar || '/avatar.png'}
                    alt="profile"
                    width={100}
                    height={100}
                />

                <div className="mt-4 text-center">
                    <h4 className="font-semibold">
                        {user.firstName} {user.lastName}
                    </h4>
                    <p className="mt-1 text-xs">{user.email}</p>
                </div>

                <div className="mt-8">
                    <SocialIcons links={user.links} />
                </div>
            </div>
        </div>
    );
};

export default page;
