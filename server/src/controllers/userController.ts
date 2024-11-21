import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { UserInt } from '../interface/interfaces';
require("../auth/passportConfig");

class userController {
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        passport.authenticate('local', (err: Error, user: UserInt, info: any) => {
            if (err) {
                console.error('Login error:', err);
                res.status(500).json({ message: 'Internal server error', error: err });
                return;
            }
            if (!user) {
                res.status(401).json({ message: 'Authentication failed', info });
                return;
            }
            req.logIn(user, (loginErr: Error) => {
                if (loginErr) {
                    console.error('Login session error:', loginErr);
                    res.status(500).json({ message: 'Failed to log in', error: loginErr });
                    return;
                }
                res.status(200).json({ message: 'Authentication successful', user });
            });
        })(req, res, next);
    }

    public async logout(req: Request, res: Response): Promise<void> {
        if (typeof req.logout === 'function') {
            req.logout((err: Error) => {
                if (err) {
                    console.error('Logout error:', err);
                    res.status(500).json({ message: 'Logout failed', error: err });
                    return;
                }
                res.status(200).json({ message: 'Logout successful' });
            });
        } else {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destroy error:', err);
                    res.status(500).json({ message: 'Logout failed', error: err });
                    return;
                }
                res.status(200).json({ message: 'Logout successful' });
            });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        if (typeof password !== 'string' || password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long' });
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                skillSet: [],
                role:req.body.role,
                profilePic: req.body.profilePic,
            });

            await newUser.save();
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (err: any) {
            if (err.code === 11000) {
                res.status(400).json({ message: 'Email or username already exists' });
            } else {
                console.error('Registration error:', err);
                res.status(500).json({ message: 'Error registering user', error: err.message });
            }
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "User ID parameter is required" });
      return;
    }

    try {
      const user = await User.findById(id).select("-password"); // Exclude password field
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user profile" });
    }
    }

    public async getUsers(_: Request, res: Response): Promise<void> {
        try {
            const users = await User.find().select('-password');
            res.status(200).json(users);
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }
}

export default new userController();
