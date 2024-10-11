import { cn } from '@/utils/cn';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'light';
}

const LoadingSpinner = ({ className, variant = 'primary' }: Props) => {
    return (
        <div
            className={cn(
                'size-5 rounded-full border-2 animate-spin',
                {
                    'border-primary border-r-white': variant === 'primary',
                    'border-light border-r-primary': variant === 'light',
                },
                className,
            )}
        ></div>
    );
};

export default LoadingSpinner;
