import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database";
import appRouter from "./src/app";
import middleware from "./src/interfaces/middleware/authMiddleware";
import {createDatabase} from './src/domain/models/index';
import helmet from "helmet";
var cors = require('cors')

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware de sécurité
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3001', // Autorise uniquement cette origine
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));
//
app.use(helmet());
// Route de l'application
app.use('/api/client/', appRouter);
app.use('/api/dashboard/', middleware, appRouter);

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