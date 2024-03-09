import express from "express";
import routes from './routes.js';
import cors from 'cors';

class App {
    constructor() {
        this.server = express();

        this.routes();  
    }

    routes() {
        this.server.use(cors());
        this.server.use(routes)
        
    }
}

export default new App().server