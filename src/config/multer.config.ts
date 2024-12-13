import { join } from 'path';

export default () => ({
  multer: {
    dest: join(__dirname, '..', '..', 'uploads'),
  },
});
