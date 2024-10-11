'use client';
import { useEffect, useState } from 'react';
import { Input } from './input';
import { Search } from 'lucide-react';
import { debounce } from '@/utils/debounce';
import { searchUser } from '@/actions/search';
import Link from 'next/link';
import Image from 'next/image';

const debouncedUserSearch = debounce(searchUser, 400);

interface ISearchUser {
    id: string;
    firstName: string;
    lastName: string | null;
    username: string;
    avatar: string | null;
}

const UserSearchForm = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<ISearchUser[]>([]);

    useEffect(() => {
        // Fetch users based on search query
        if (!searchQuery) {
            setUsers([]);
            return;
        }

        setIsLoading(true);
        debouncedUserSearch(searchQuery)
            .then((users) => {
                setUsers(users);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchQuery]);

    return (
        <>
            <div className="relative">
                <Input
                    placeholder="Search for a user"
                    prefixIcon={<Search size={16} />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isLoading && (
                    <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    </div>
                )}
            </div>

            <div className="mt-3 flex flex-col gap-2">
                {!users.length ? (
                    <p className="text-center">No users found</p>
                ) : (
                    users.map((user) => (
                        <Link
                            key={user.id}
                            href={`/${user.username}`}
                            className="flex items-center gap-2"
                        >
                            <Image
                                src={user.avatar || '/avatar-placeholder.png'}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="w-8 h-8 rounded-full bg-gray-300"
                                height={32}
                                width={32}
                            />
                            <div className="font-semibold">
                                {user.firstName} {user.lastName}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
};

export default UserSearchForm;
