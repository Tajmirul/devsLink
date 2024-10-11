import Button from '@/components/button';
import DevlinksLogoLg from '@/components/icons/DevlinksLogoLg';
import DevLinksLogoSm from '@/components/icons/DevLinksLogoSm';
import UserSearchForm from '@/components/UserSearchForm';
import { getCurrentUser } from '@/utils/session';

export default async function Home() {
    const authUser = await getCurrentUser();

    return (
        <div className="relative">
            <nav className="relative z-[1] pt-4 px-4">
                <div className="container bg-white py-4 px-5 rounded-xl flex items-center justify-between">
                    <div>
                        <span className="max-sm:hidden">
                            <DevlinksLogoLg />
                        </span>
                        <span className="sm:hidden">
                            <DevLinksLogoSm />
                        </span>
                    </div>

                    <Button
                        as="link"
                        variant="primary"
                        href={
                            authUser ? `/${authUser?.username}` : '/auth/signin'
                        }
                    >
                        {authUser ? 'My Profile' : 'Sign In'}
                    </Button>
                </div>
            </nav>
            <div className="absolute left-0 top-0 z-[-1] h-[300px] w-full bg-primary rounded-b-[40px]"></div>

            <div className="max-w-[300px] mx-auto bg-white shadow-lg rounded-xl mt-20 p-6 mb-10 min-h-[240px]">
                <UserSearchForm />
            </div>
        </div>
    );
}
