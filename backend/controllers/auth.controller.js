import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const generateTokens = (id) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })

    return {accessToken, refreshToken};
}

const storeRefeshToken = async (userId, refreshToken) => {
    await redis.set(`refreshToken:${userId}`, refreshToken, "EXPIRES", 7 * 24 * 60 * 60);
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, //prevents XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attacks
        maxAge: 15 * 60 * 1000 // 15 minutes
    })
    res.cookie("refeshToken", refreshToken, {
        httpOnly: true, //prevents XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attacks
        maxAge: 7*24*60*60*1000 //7 days
    })
}

export const signup =  async (req, res) => {
    const {email, password, name} = req.body
    try {
        const userExists = await User.findOne({ email });

    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }
    const user = await User.create({name, email, password});

    const {accessToken, refreshToken} = generateTokens(user._id);
    await storeRefeshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({ user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = (req, res) => {
    res.send("Login Route Called");
}

export const logout = (req, res) => {
    res.send("Logout Route Called");
}