import { platformInfo } from '@/utils/platformInfo';
import { PlatformType } from '@prisma/client';
import * as yup from 'yup';

const platformOptions = Object.keys(platformInfo) as PlatformType[];

export const linkUpdateDto = yup.object().shape({
    links: yup
        .array()
        .of(
            yup.object().shape({
                id: yup.string().optional(),
                platform: yup
                    .string()
                    .oneOf<PlatformType>(platformOptions, 'Invalid platform')
                    .required('Select a platform'),
                // check if url starts with the prefix of respective platform
                url: yup
                    .string()
                    .test(
                        'url-validation',
                        'Invalid URL for this platform',
                        function (value) {
                            const platform = this.parent
                                .platform as PlatformType;

                            const { regex } = platformInfo[platform];

                            if (!regex.test(value!)) {
                                return false;
                            }

                            return true;
                        },
                    )
                    // .url('Invalid url')
                    .required('Url is empty'),
            }),
        )
        .required(),
});

export type LinkUpdateDtoType = yup.InferType<typeof linkUpdateDto>;
