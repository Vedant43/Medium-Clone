import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors';
// import process from 'process'

const app = new Hono<{
  Bindings: {
    DATABASE_URL:string
    JWT_SECRET:string
  }
}>()

app.use('/*', cors())
app.route("api/v1/user",userRouter)
app.route("api/v1/blog",blogRouter)


export default app
