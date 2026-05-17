import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import emailRoutes from './routes/emailRoutes.js'

const app: express.Application = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(emailRoutes)

app.get('/health', (req: Request, res: Response) => {
    res.json({
        upTime: process.uptime(),
    })
})

export default app;