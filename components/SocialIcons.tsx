'use client';
import { cn } from '@/utils/cn';
import { platformInfo } from '@/utils/platformInfo';
import { PlatformType } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

interface Props {
    links: {
        platform: PlatformType;
        url: string;
    }[];
}

const SocialIcons = ({ links }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            {links.map((link) => (
                <button
                    key={link.platform}
                    className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-opacity-50',
                        platformInfo[link.platform as PlatformType].color,
                    )}
                    onClick={() => {
                        navigator.clipboard.writeText(link.url);
                        toast.success('Copied to clipboard');
                    }}
                >
                    <span className="flex gap-2 items-center">
                        {platformInfo[link.platform as PlatformType].icon}
                        <span className="capitalize text-xs font-semibold">
                            {link.platform.toLowerCase()}
                        </span>
                    </span>
                    <ArrowRight size={16} />
                </button>
            ))}
        </div>
    );
};

export default SocialIcons;
