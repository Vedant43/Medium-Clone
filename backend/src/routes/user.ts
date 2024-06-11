import {Hono} from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signUpInput,signInInput} from '@vedant567/medium-common'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

userRouter.post('/signup',async (c)=>{
    //client is declared here as global variable are under risk they can be lost anytime using workers
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json() 
    
    const {success} = signUpInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Incorrect input"
      })
    }
  
    try{
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        },
      })
      console.log(user)
      const token = await sign({id:user.id}, c.env.JWT_SECRET)
      console.log(token)
      return c.json({token,id:user.name})
    }catch(e) {
          return c.text("Invalid");
      }
  })
  
  userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json() 

    const {success} = signInInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Incorrect input"
      })
    }
    console.log(body)
  
    try{
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: body.email,
          password:body.password
        }
      });
    
      console.log(user)
    
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
    
      const token = await sign({id:user.id},c.env.JWT_SECRET)
      console.log(token)
      return c.json({token,id:user.name})
    }catch{
      return c.text('invalid')
    }
  
  })