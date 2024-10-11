import * as React from 'react';

import { cn } from '@/utils/cn';

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    prefixIcon?: React.ReactNode;

    classNames?: {
        container?: string;
        label?: string;
        inputWrapper?: string;
        prefixIcon?: string;
        input?: string;
        error?: string;
    };
}

const SelectInput = React.forwardRef<HTMLSelectElement, Props>(
    (
        { label, error, prefixIcon, className, classNames, children, ...props },
        ref,
    ) => {
        return (
            <div className={classNames?.container}>
                {label ? (
                    <label
                        htmlFor={props.id}
                        className={cn(
                            'text-sm mb-1 inline-block',
                            classNames?.label,
                        )}
                    >
                        {label}
                    </label>
                ) : null}

                <div className={cn('relative', classNames?.inputWrapper)}>
                    <div
                        className={cn(
                            'absolute top-0 left-0 bottom-0 aspect-square flex items-center justify-center text-black/50 pointer-events-none',
                            classNames?.prefixIcon,
                        )}
                    >
                        {prefixIcon}
                    </div>
                    <select
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 ring-offset-background file:border-0 file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
                            {
                                'pl-11': prefixIcon,
                            },
                            className,
                            classNames?.input,
                        )}
                        ref={ref}
                        {...props}
                    >
                        {children}
                    </select>
                </div>
                {error ? (
                    <span
                        className={cn(
                            'inline-block text-xs text-rose-500 mt-0.5 font-medium',
                            classNames?.error,
                        )}
                    >
                        {error}
                    </span>
                ) : null}
            </div>
        );
    },
);

SelectInput.displayName = 'SelectInput';

export { SelectInput };
