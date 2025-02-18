import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database";
import appRouter from "./src/appRouter";
import middleware from "./src/interfaces/middleware/authMiddleware";
import {createDatabase} from './src/domain/models/index';
import helmet from "helmet";
import dashboardRouter from "./src/dashboardRouter";
var cors = require('cors')

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware de sécurité
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3039', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));
//
app.use(helmet());
// Route de l'application
app.use('/api/client/', appRouter);
// app.use('/api/dashboard/', middleware, dashboardRouter);
app.use('/api/dashboard/', dashboardRouter);

// Vérifier si la création de la base de données est activée
const createDb = process.env.CREATE_DB === 'true';

// Authentification à la base de données
sequelize.authenticate()
    .then(() => {
        console.log("Database connected!");
        if (createDb) {

            createDatabase();
        }

        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });

    })
    .catch((err: Error) => {
        console.error("Error connecting to the database:", err);
    });

export { createDb };