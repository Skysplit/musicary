import { get } from 'lodash';
import SocketIO from 'socket.io';
import parseJWT from '@server/utils/parseJWT';
import User, { UserInterface } from '@server/module/user/user.model';

const io = SocketIO({
  serveClient: false,
});

interface UserSocket extends SocketIO.Socket {
  user?: User;
}

io.use(async (socket: UserSocket, next) => {
  const token = get(socket, 'handshake.query.token', false);
  const decodedUser = parseJWT(token) as UserInterface | null;

  if (!decodedUser) {
    return next(new Error('Unauthorized!'));
  }

  const user = await User.findOne(decodedUser.id);

  if (!user) {
    return next(new Error('Unauthorized!'));
  }

  socket.user = user;
  socket.join(`${user.id}`);

  next();
});

io.on('connect', (socket: UserSocket) => {

});

export default io;
