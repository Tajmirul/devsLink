'use client';

import { cn } from '@/utils/cn';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props
    extends LinkProps,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    children: ReactNode | ReactNode[];
}

const NavLink = ({ href, className, children, ...props }: Props) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={cn(
                'flex gap-2 items-center py-2 px-3 rounded-md text-sm font-semibold hover:bg-primary/5 hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-50',
                {
                    'bg-primary/10 text-primary': pathname === href,
                },
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
};

export default NavLink;
