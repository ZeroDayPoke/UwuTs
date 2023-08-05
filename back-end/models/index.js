// ./models/index.js

import db from '../config/database.js';
import User from './User.js';
import { Role, UserRole } from './Role.js';
import Home from './Home.js';

db.User = User;
db.Home = Home;
db.Role = Role;
db.UserRole = UserRole;

Object.values(db).forEach(model => {
  if ('associate' in model) {
    model.associate(db);
  }
});

export { db, User, Home, Role, UserRole };
