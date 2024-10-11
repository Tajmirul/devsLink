import { PlatformType } from '@prisma/client';
import Phone from './icons/Phone';
import SocialIcons from './SocialIcons';
import Image from 'next/image';

interface Props {
    profilePicture?: string | null;
    name: string;
    email: string;

    links: {
        platform: PlatformType;
        url: string;
    }[];
}

const PhonePreview = ({ profilePicture, name, email, links }: Props) => {
    return (
        <div className="sticky top-5">
            <Phone />

            <Image
                className="absolute top-20 left-1/2 -translate-x-1/2 flex justify-center size-[100px] rounded-full border-4 border-primary"
                src={profilePicture || '/avatar.png'}
                alt="profile"
                height={100}
                width={100}
            />

            <div className="absolute top-[200px] left-0 text-center w-full">
                <h4 className="font-medium">{name}</h4>
                <p className="mt-1 text-xs">{email}</p>
            </div>

            <div className="absolute top-[300px] left-8 right-8">
                <SocialIcons links={links} />
            </div>
        </div>
    );
};

export default PhonePreview;
