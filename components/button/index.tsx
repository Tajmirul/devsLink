'use client';
import { cn } from '@/utils/cn';
import React, { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import LoadingSpinner from '../icons/LoadingSpinner';
import Link, { LinkProps } from 'next/link';
import { Next_Page_Url } from '@/types/next-auth';
import toast from 'react-hot-toast';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    copy?: string;
};

type Props = {
    isLoading?: boolean;
    as?: 'button' | 'link';
    variant?: 'primary' | 'outline';
    children: ReactNode | ReactNode[];
    className?: string;
} & (LinkProps<Next_Page_Url> | ButtonProps);

const Spinner = () => {
    return (
        <span className="absolute inset-0 bg-primary rounded-md flex gap-2 items-center justify-center">
            <LoadingSpinner variant="light" />
        </span>
    );
};

const Button = ({
    children,
    as = 'button',
    variant = 'primary',
    className,
    isLoading,
    ...rest
}: Props) => {
    const variantClasses = {
        primary: 'bg-primary text-white',
        outline:
            'bg-white text-primary border border-primary hover:bg-primary hover:text-white',
    }[variant];

    const buttonClasses = cn(
        'h-8 md:h-10 px-3 md:px-7 inline-flex items-center justify-center rounded-md font-medium relative transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-50',
        variantClasses,
        className,
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { copy, onClick } = rest as ButtonProps;

        if (copy) {
            navigator.clipboard.writeText(copy);
            toast.success('Copied to clipboard');
        }

        if (onClick) onClick(e);
    };

    if (as === 'link') {
        const props = rest as ComponentProps<typeof Link>;

        return (
            <Link className={buttonClasses} {...props} href={props.href || '#'}>
                {isLoading ? <Spinner /> : children}
            </Link>
        );
    } else if (as === 'button') {
        const props = rest as ButtonProps;

        return (
            <button className={buttonClasses} {...props} onClick={handleClick}>
                {isLoading ? <Spinner /> : children}
            </button>
        );
    }
};

export default Button;
