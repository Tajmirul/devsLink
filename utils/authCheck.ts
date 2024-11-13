import 'server-only';
import { getCurrentUser } from './session';

/**
 * checks if user is authenticated.
 * @returns error if user is not authenticated. otherwise, returns true.
 */
export const authCheck = async () => {
    const user = getCurrentUser();

    if (!user) {
        throw new Error('User is not authenticated');
    }
    return true;
};
