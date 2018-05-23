import appSecret from '@server/utils/appSecret';
import jwt from 'jsonwebtoken';

export default (token: string) => jwt.verify(token, appSecret);
