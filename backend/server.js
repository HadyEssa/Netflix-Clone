import express from 'express';
import cookieParser from 'cookie-parser';


import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from './config/envVars.js';
import { protectRoute } from './middleware/protectRoute.js';


const app = express();

const PORT = ENV_VARS.PORT || 5000;


app.use(express.json()); // this to allowed prease req.body
app.use(cookieParser())  // this to parse cookies from the request

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie", protectRoute ,movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:PORT:, ${PORT}`);
    connectDB();
})


