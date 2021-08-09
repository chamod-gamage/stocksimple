import jwt from 'jsonwebtoken';

export const isAuthorized = (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userInfo = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = {
      _id: userInfo._id,
      username: userInfo.username,
    };
    next();
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export const generateToken = (res, _id, username) => {
  const expiration =
    process.env.NODE_ENV !== 'production' ? 10000000 : 604800000;
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV !== 'production' ? '1d' : '7d',
  });
  return res.cookie('stocksimple_token', token, {
    expires: new Date(Date.now() + expiration),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
};
