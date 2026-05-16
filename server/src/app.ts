import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app: express.Application = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true

}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/health', (req: Request, res: Response) => {

    res.json({
        upTime: process.uptime(),
    })
})
export default app;