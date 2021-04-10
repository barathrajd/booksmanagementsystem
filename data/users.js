import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: true,
  },
  {
    name: 'Barathraj D',
    email: 'barath@example.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false,
  },
  {
    name: 'Devarajan V',
    email: 'deva@example.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false,
  },
];

export default users;
