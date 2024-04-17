import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';

/**
 * @SIGNUP
 * @ROUTE @POST {{url}}/api/auth
 * @access PUBLIC
 */
export const signUp = async (res, req, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send(400).json({
      message: 'All fields are necessary',
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  if (!newUser) {
    return res.send(400).json({
      message: 'User not created please try again later',
    });
  }

  try {
    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};
