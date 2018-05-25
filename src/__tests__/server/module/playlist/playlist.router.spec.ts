import request, { SuperTest, Test } from 'supertest';
import createApp from '@server/createApp';
import User from '@server/module/user/user.model';
import { Application } from 'express';
import createJWT from '@server/utils/createJWT';
import Playlist from '@server/module/playlist/playlist.model';

describe('/api/playlists', () => {
  const headers = { Authorization: '' };
  let app: Application;
  let user: User;
  let playlist: Playlist;
  let req: SuperTest<Test>;

  beforeAll(async () => {
    app = await createApp();

    user = User.create({
      email: 'test@example.com',
      password: 'Secret99',
    });

    playlist = Playlist.create({
      name: 'FirstPlaylist',
      position: 0,
      user: await user.save(),
    });

    await playlist.save();

    headers.Authorization = `Bearer ${createJWT(user.toJSON())}`;
  });

  beforeEach(() => {
    req = request(app);
  });

  describe('GET /', () => {
    test('should return playlists list', async () => {
      const response = await req.get('/api/playlists').set(headers);

      expect(response.body).toEqual([
        expect.objectContaining({ name: 'FirstPlaylist' }),
      ]);
    });
  });

  describe('GET /:id', () => {
    test('should return single playlist', async () => {
      const response = await req.get(`/api/playlists/${playlist.id}`).set(headers);
      expect(response.body).toEqual(
        expect.objectContaining({ name: 'FirstPlaylist' }),
      );
    });
  });

  describe('POST /', () => {
    test('should save playlist', async () => {
      const response = await req.post(`/api/playlists`).set(headers).send({
        name: 'SecondPlaylist',
        position: 1,
      });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'SecondPlaylist',
          position: 1,
        }),
      );
      expect(await Playlist.count()).toEqual(2);

      // Cleanup
      await Playlist.remove(response.body);
    });
  });

  describe('PUT /:id', () => {
    test('should update playlist', async () => {
      const newPlaylist = await Playlist
        .create({ user, name: 'TestPlaylist', position: 2 })
        .save();

      const response = await req.put(`/api/playlists/${newPlaylist.id}`).set(headers).send({
        name: 'ChangedName',
      });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'ChangedName',
          id: newPlaylist.id,
          position: 2,
        }),
      );

      expect(await Playlist.findOne(newPlaylist.id)).toEqual(
        expect.objectContaining({ name: 'ChangedName' }),
      );

      // Cleanup
      await newPlaylist.remove();
    });
  });

  describe('DELETE /:id', () => {
    test('should delete playlist', async () => {
      const newPlaylist = await Playlist
        .create({ user, name: 'ToDelete', position: 2 })
        .save();

      const response = await req.delete(`/api/playlists/${newPlaylist.id}`).set(headers);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({ name: newPlaylist.name, position: newPlaylist.position }),
      );

      expect(await Playlist.count()).toEqual(1);
    });
  });
});
