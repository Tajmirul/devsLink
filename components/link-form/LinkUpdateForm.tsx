'use client';
import Button from '@/components/button';
import { SelectInput } from '@/components/input/SelectInput';
import { formikPropsGenerator } from '@/utils/formik-props-generator';
import { useFormik } from 'formik';
import { Equal, Link } from 'lucide-react';
import { platformInfo } from '@/utils/platformInfo';
import { PlatformType } from '@prisma/client';
import { Input } from '@/components/input';
import { updateLinksAction } from '@/actions/links';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
    linkUpdateDto,
    LinkUpdateDtoType,
} from '@/app/[username]/(authWrapper)/links/link-update.dto';
import { useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface Props {
    links: {
        platform: PlatformType;
        url: string;
    }[];
}

const initialValues: LinkUpdateDtoType = {
    links: [{ platform: 'GITHUB', url: '' }],
};

const LinkUpdateForm = ({ links }: Props) => {
    const { data: session } = useSession();

    const formik = useFormik({
        initialValues,
        validationSchema: linkUpdateDto,
        onSubmit: async (values) => {
            try {
                const links = await updateLinksAction(
                    session!.user.id,
                    values.links.map((link, index) => ({
                        ...link,
                        order: index,
                    })),
                );
                formik.setValues({ links });

                toast.success('Links are updated successfully');
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            }
        },
    });

    useEffect(() => {
        if (!links.length) {
            return;
        }

        formik.setValues({ links });
    }, [links]);

    const handleAddLink = () => {
        formik.setFieldValue('links', [
            ...(formik.values.links || []),
            initialValues.links[0],
        ]);
    };
    const handleRemoveLink = (index: number) => {
        const newLinks = formik.values.links?.filter(
            (_item, idx) => idx !== index,
        );

        formik.setFieldValue('links', newLinks);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="h-full flex flex-col">
            <h1 className="font-bold text-2xl">Customize your links</h1>
            <p className="mt-2 text-black/70">
                Add/edit/delete the links below and share your profile to the
                world
            </p>

            <div className="mt-10 mb-4">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleAddLink}
                >
                    Add new link
                </Button>
            </div>

            <ReactSortable
                id="order"
                handle=".drag-grabber"
                animation={150}
                easing="cubic-bezier(1, 0, 0, 1)"
                direction="vertical"
                list={formik.values.links as any}
                setList={(links) => formik.setFieldValue('links', links)}
                className="space-y-2"
            >
                {formik.values.links?.map((link, index) => (
                    <div
                        className="bg-background rounded-md p-3 md:p-5 space-y-3"
                        key={index}
                    >
                        <div className="flex items-center justify-between">
                            <div className="drag-grabber flex gap-2 items-center cursor-grab text-black/50 font-bold mb-3">
                                <Equal size={16} />
                                <span>Link #{index + 1}</span>
                            </div>
                            <button
                                type="button"
                                className="text-xs text-black/70"
                                onClick={() => handleRemoveLink(index)}
                            >
                                Remove
                            </button>
                        </div>

                        <SelectInput
                            label="Platform"
                            id={`links.${index}.platform`}
                            className="capitalize"
                            prefixIcon={
                                platformInfo[link.platform as PlatformType].icon
                            }
                            {...formikPropsGenerator(
                                formik,
                                `links.${index}.platform`,
                            )}
                            name={`links.${index}.platform`}
                            value={formik.values.links[index].platform}
                        >
                            <option value="" disabled>
                                Select platform
                            </option>
                            {Object.keys(platformInfo).map((item) => (
                                <option value={item} key={item}>
                                    {item.toLowerCase()}
                                </option>
                            ))}
                        </SelectInput>

                        <Input
                            label="Url"
                            id={`links.${index}.url`}
                            type="text"
                            placeholder="Enter url"
                            prefixIcon={<Link size={16} />}
                            {...formikPropsGenerator(
                                formik,
                                `links.${index}.url`,
                            )}
                            name={`links.${index}.url`}
                            value={formik.values.links[index].url}
                            onChange={(e) => {
                                formik.setFieldValue(
                                    `links.${index}.url`,
                                    e.target.value,
                                );
                            }}
                        />
                    </div>
                ))}
            </ReactSortable>

            <div className="flex justify-end items-end grow">
                <div className="pt-4 mt-8 border-t w-full flex justify-end">
                    <Button
                        type="submit"
                        className="text-sm h-10"
                        isLoading={formik.isSubmitting}
                        disabled={formik.isSubmitting}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LinkUpdateForm;