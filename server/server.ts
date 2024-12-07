import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from 'express';
const app = express();
import authRoutes from './src/routes/authenticationRoutes';
import jobRoutes from './src/routes/jobRoutes';
import userRoutes from "./src/routes/userRoutes";
import reportRoutes  from "./src/routes/reportRoutes";
import passport from 'passport';
require ("./src/auth/passportConfig");
import cookieParser from 'cookie-parser';
import session from 'express-session';
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))

const corsOptions = {
    origin: 'http://localhost:1420', // Ensure this matches your frontend's URL
    credentials: true,               // Allow cookies and authorization headers
  };
  
  app.use(cors(corsOptions));

  app.options('*', cors(corsOptions));
app.use(cors(corsOptions));        // CORS middleware
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB or as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));


app.use("/api/auth",authRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/users',userRoutes)
app.use('/api/reports',reportRoutes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});