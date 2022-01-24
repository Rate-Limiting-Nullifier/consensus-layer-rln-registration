import express from 'express';
import cors from 'cors';
import rootRouter from './routes/root';
import registrationRouter from './routes/registration';
import registerRouter from './routes/register';
import slashedRouter from './routes/slashed';
import path from 'path';

/**
 * @description The client uses Express for the REST API and for the frontend.
 * @author AtHeartEngineer
 * @since 2021-01-01
 */

const app = express();
const PORT = 8000;

// CORS Options for use in Express
const allowedOrigins = [`http://localhost:{PORT}`];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Initializing middleware to enable CORS and json
app.use(cors(options));
app.use(express.json());

// Serves static files out of public folder
app.use(express.static(path.join(__dirname, 'public/')));

// Routes
app.use('/', rootRouter);
app.use('/api/v1/register', registerRouter);
app.use('/api/v1/getRegistration', registrationRouter);
app.use('/api/v1/getSlashedMembers', slashedRouter);

// Start server
app.listen(PORT, () => {
    console.log(`⚡️Server is running at https://localhost:${PORT}`);
});