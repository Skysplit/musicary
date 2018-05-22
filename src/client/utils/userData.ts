import Cookie from 'js-cookie';
import { UserInterface } from '@client/store/user';

export const TOKEN_KEY = 'userToken';
export const USER_KEY = 'userData';

export const saveUserToken = (token: string, remember = false) => (
  Cookie.set(TOKEN_KEY, token, {
    expires: remember ? 90 : null,
  })
);

export const getUserToken = (): string => Cookie.get(TOKEN_KEY);

export const saveUserData = (user: UserInterface) => localStorage.setItem(
  USER_KEY,
  JSON.stringify(user),
);

export const getUserData = (): UserInterface | null => {
  const userString = localStorage.getItem(USER_KEY);

  if (userString) {
    return <UserInterface>JSON.parse(userString);
  }

  return null;
};

export const removeUser = () => {
  Cookie.remove(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
