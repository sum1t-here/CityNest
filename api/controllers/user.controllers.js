import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';
import { errorHandler } from './../utils/error.utils.js ';

export const test = (req, res) => {
  res.json({
    message: 'Hello world',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account'));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 100);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
  } catch (error) {
    next(error);
  }
};
