import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.utils.js';
import jwt from 'jsonwebtoken';

/**
 * @SIGNUP
 * @ROUTE @POST {{url}}/api/auth
 * @access PUBLIC
 */
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return next(errorHandler(400, 'All fields are required'));

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  if (!newUser)
    return next(errorHandler(400, 'User not created, please try again'));

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

/**
 * @SIGNIN
 * @ROUTE @POST {{url}}/api/auth
 * @access PUBLIC
 */

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'e-mail or password not entered',
      });
    }
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong Credentials'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
