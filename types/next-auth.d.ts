import { User } from '@prisma/client';

declare module 'next-auth' {
    interface Session {
        user: Omit<User, 'password'>;
    }
}

export type Next_Page_Url =
    | UrlObject
    | __next_route_internal_types__.StaticRoutes
    | __next_route_internal_types__.DynamicRoutes;
