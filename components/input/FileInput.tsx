import { cn } from '@/utils/cn';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classNames?: {
        container?: string;
        input?: string;
        preview?: string;
    };
}

const FileInput = ({
    value,
    onChange,
    classNames,
    className,
    ...props
}: Props) => {
    const imageRef = useRef<HTMLImageElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            imageRef.current?.setAttribute('srcset', reader.result as string);
        };
        reader.readAsDataURL(file);

        onChange(e);
    };

    return (
        <div
            className={cn(
                'group relative rounded-xl overflow-hidden',
                classNames?.container,
            )}
        >
            <input
                type="file"
                name="avatar"
                id="avatar"
                className={cn(
                    'absolute inset-0 opacity-0 cursor-pointer z-[1]',
                    classNames?.input,
                    className,
                )}
                onChange={handleChange}
                {...props}
            />
            <Image
                src={value || '/avatar.png'}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
                ref={imageRef}
                height={100}
                width={100}
            />

            <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <ImageIcon size={28} />
                <p className="text-white text-xs mt-2">Change Image</p>
            </div>
        </div>
    );
};

export default FileInput;
