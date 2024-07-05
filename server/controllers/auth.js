import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const alreadyExists = await User.findOne({ where: { username } });
        if (alreadyExists) return res.status(400).json({ msg: "This username has already been taken" });
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, password: hashPassword });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ msg: "This user does not exist" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "The password is incorrect" });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};