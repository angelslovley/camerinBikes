import { config } from "dotenv"

config()

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'dev'

// Port
export const PORT = process.env.PORT || 8000

// Database
export const DB_HOST = process.env.DB_HOST || 'mongodb+srv://nikkyanna07:HzBWj0MFp2RwgTmr@cluster0.dwcjcjs.mongodb.net/biker'

// JWT Secret
export const JWT_SECRET = process.env.JWT_SECRET || 'biker_secret'

export const CLIENT_URL = 'http://localhost:3000'