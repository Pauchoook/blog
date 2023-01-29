import { Auth } from '../pages/Auth';
import { Profile } from '../pages/Profile';
import { Post } from '../pages/Post';
import { Wall } from '../pages/Wall';
import { POST, PROFILE, WALL, AUTH, USER } from './path';
import { User } from '../pages/User';

export const publicRoutes = [
  {
    path: WALL,
    Component: Wall,
  },
  {
    path: `${POST}/:id`,
    Component: Post,
  },
  {
    path: AUTH,
    Component: Auth,
  },
  {
    path: `${USER}/:id`,
    Component: User,
  },
];
export const privateRoutes = [
  {
    path: PROFILE,
    Component: Profile,
  },
];
