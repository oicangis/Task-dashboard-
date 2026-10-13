import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { User } from '../../../generated/prisma/browser';


export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
    
}

export async function POST(request: Request) {
    const body = await request.json()

    const creartask = await prisma.task.create({
        data:{
        title: body.title,
        description: body.description,
        // id: body.id,
        completed: body.completed,
        dueDate: body.dueDate,
        userId: body.userId,
        // user: body.User,
        // createdAt: body.createdAt,
        // updatedAt: body.updatedAt,    

        }
    })
    return NextResponse.json(creartask)
}