import { selectToken, selectUser } from "redux/user/userSlice";
import { useAppSelector } from "hooks/redux";
import { User } from "types/user";

interface UseUser {
    loggedIn: boolean;
    user: User | null;
    token: string | null;
}

const useUser = (): UseUser => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);

    return {
        loggedIn: user !== null && token !== null,
        user,
        token,
    };
};

export default useUser;
