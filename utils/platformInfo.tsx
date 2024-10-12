import { PlatformType } from '@prisma/client';
import {
    FaFacebookF,
    FaLink,
    FaLinkedinIn,
    FaXTwitter,
    FaYoutube,
} from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import { TbBrandGithubFilled } from 'react-icons/tb';

export const platformInfo: {
    [key in PlatformType]: {
        icon: JSX.Element;
        color: string;
        regex: RegExp;
    };
} = {
    GITHUB: {
        icon: <TbBrandGithubFilled />,
        color: 'bg-[#24292e] text-white',
        regex: /https:\/\/?(www.)?github.com\/.+/,
    },
    TWITTER: {
        icon: <FaXTwitter />,
        color: 'bg-[#1da1f2] text-white',
        regex: /https:\/\/?(www.)?twitter.com\/.+/,
    },
    LINKEDIN: {
        icon: <FaLinkedinIn size={16} />,
        color: 'bg-[#0077b5] text-white',
        regex: /https:\/\/?(www.)?linkedin.com\/in\/.+/,
    },
    FACEBOOK: {
        icon: <FaFacebookF />,
        color: 'bg-[#1877f2] text-white',
        regex: /https:\/\/?(www.)?facebook.com\/.+/,
    },
    INSTAGRAM: {
        icon: <RiInstagramFill />,
        color: 'bg-[#c13584] text-white',
        regex: /https:\/\/?(www.)?instagram.com\/.+/,
    },
    YOUTUBE: {
        icon: <FaYoutube />,
        color: 'bg-[#ff0000] text-white',
        regex: /https:\/\/?(www.)?youtube.com\/channel\/.+/,
    },
    WEBSITE: {
        icon: <FaLink />,
        color: 'bg-[#000000] text-white',
        regex: /https:\/\/?(www.)?.+/,
    },
    OTHER: {
        icon: <FaLink />,
        color: 'bg-[#000000] text-white',
        regex: /https:\/\/?(www.)?.+/,
    },
};
