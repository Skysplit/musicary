import { UserInterface } from '@app/server/module/user/user.model';

class UserStorage {
  static save(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  static get(key: string) {
    return localStorage.getItem(key);
  }
}

const TOKEN_KEY = 'userToken';
const USER_KEY = 'userData';

export const saveUserToken = (token: string) => UserStorage.save(TOKEN_KEY, token);

export const getUserToken = (): string => UserStorage.get(TOKEN_KEY);

export const saveUserData = (user: UserInterface) => UserStorage.save(
  USER_KEY,
  JSON.stringify(user),
);

export const getUserData = (): UserInterface | null => {
  const userString = UserStorage.get(USER_KEY);

  if (userString) {
    return <UserInterface>JSON.parse(userString);
  }

  return null;
};
