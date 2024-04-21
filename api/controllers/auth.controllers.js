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
      return next(errorHandler(401, 'Fill in all the details'));
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

/**
 * @SIGNIN
 * @ROUTE @POST {{url}}/api/auth
 * @access PUBLIC
 */

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out successfully');
  } catch (error) {
    next(error);
  }
};
