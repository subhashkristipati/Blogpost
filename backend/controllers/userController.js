require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');

const signup = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, email: request.body.email, passwordHash: hashedPassword };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({
            msg: 'Signup successful',
            name: newUser.username,
            email: newUser.email
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            msg: 'Error while signing up user'
        });
    }
};

const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return response.status(400).json({ msg: 'Email does not match' });
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            const emailRegex = /\S+@\S+\.\S+/;
            if (emailRegex.test(email)) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '30m' });
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
                // console.log(refreshToken);
                const newToken = new Token({ token: refreshToken });
                await newToken.save();

                response.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    name: user.username,
                    email: user.email
                });
            } else {
                response.status(400).json({ msg: 'Invalid email format' });
            }
        } else {
            response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error while logging in the user' });
    }
};


const logout = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'Logout successful' });
};


const getUser = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports = { signup, login, logout, getUser }