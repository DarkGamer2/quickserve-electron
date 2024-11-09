import express from "express";
import cors from "cors";
const app = express();
import authRoutes from './src/routes/authenticationRoutes';
import '../server/src/auth/passportConfig';
import jobRoutes from './src/routes/jobRoutes';
import userRoutes from "./src/routes/userRoutes";
import passport from 'passport';
import session from 'express-session';
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth",authRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/users',userRoutes)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});