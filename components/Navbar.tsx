import { getCurrentUser } from '@/utils/session';
import Link from 'next/link';
import React from 'react';
import DevlinksLogoLg from './icons/DevlinksLogoLg';
import DevLinksLogoSm from './icons/DevLinksLogoSm';
import { Eye, Link as LinkIcon, LogOut, UserCircle } from 'lucide-react';
import NavLink from './NavLink';
import Button from './button';

const Navbar = async () => {
    const user = await getCurrentUser();

    return (
        <nav className="bg-white">
            <div className="container flex items-center justify-between py-3">
                <Link href={`/`} className="">
                    <span className="max-sm:hidden">
                        <DevlinksLogoLg />
                    </span>
                    <span className="sm:hidden">
                        <DevLinksLogoSm />
                    </span>
                </Link>

                <div className="flex gap-2 items-center">
                    <NavLink href={`/${user?.username}/links`}>
                        <LinkIcon size={16} />
                        <span className="max-sm:hidden">Links</span>
                    </NavLink>
                    <NavLink href={`/${user?.username}/edit`}>
                        <UserCircle size={16} />
                        <span className="max-sm:hidden">Profile Details</span>
                    </NavLink>
                </div>

                <div className="flex gap-2 items-center">
                    <Button
                        as="link"
                        href={`/${user?.username}`}
                        variant="outline"
                    >
                        <span className="sm:hidden">
                            <Eye size={16} />
                        </span>
                        <span className="max-sm:hidden">Preview</span>
                    </Button>
                    <Link
                        href={`/auth/signout`}
                        className="max-md:hidden size-10 rounded-md flex items-center justify-center hover:bg-rose-500/10 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-50"
                    >
                        <LogOut size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
