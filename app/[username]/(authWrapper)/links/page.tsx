import { getLinks } from '@/actions/links';
import LinkUpdateForm from '@/components/link-form/LinkUpdateForm';
import { getCurrentUser } from '@/utils/session';
import { redirect } from 'next/navigation';

const Page = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/auth/signin');
    }

    const links = await getLinks(user.id);

    return <LinkUpdateForm links={links} />;
};

export default Page;
