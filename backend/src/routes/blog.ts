import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Hono} from 'hono'
import { verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from '@vedant567/medium-common'
import { stringify } from 'querystring'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>()

blogRouter.use(async (c,next)=>{
    console.log("hi fron blog 2")

    const token = c.req.header('Authorization') || ''
    const user = await verify(token,c.env.JWT_SECRET)
    console.log(user.id)

    
    if(user){
        c.set("userId", user.id)

        await next()
    }else{
        return c.json({
            msg:"Invalid"
        })
    }
})

blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json() 

    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Incorrect input"
      })
    }
    const authorId = c.get('userId')
    // localStorage.setItem("userId",authorId)

    console.log(authorId)

    const post = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId
        }
    })

    return c.json({
        id:post.id
    })
})

blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json() 
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message:"Incorrect input"
      })
    }
    console.log(body)

    const post = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:post.id
    })
})

blogRouter.get("/blogs")

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.findMany({
        select: {
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    console.log(post+'hi')
    return c.json({ 
        post
    })
})

blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
        const userId:string = c.req.param('id') || '';
        console.log("from get"+userId)

        const post = await prisma.post.findFirst({
            where:{
                id:userId
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
    console.log("post"+post)
    
    return c.json({
        post
    })
})

// add pagination


