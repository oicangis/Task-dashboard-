import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}){
    const body = await request.json()
    const {id} = await params
    
    const editartask = await prisma.task.update({
        where:{id:id},
        data:{
        title: body.title,
        description: body.description,
        completed: body.completed,
        dueDate: body.dueDate,
        userId: body.userId,
        // user: body.User,
        // createdAt: body.createdAt,
        // updatedAt: body.updatedAt,    

        }
    })

    return NextResponse.json(editartask)

    
}

export async function DELETE(request: Request, {params}:{params: Promise<{id: string}>}){
    const {id} = await params

    const borrartask = await prisma.task.delete({
        where:{id:id},
    })

    return NextResponse.json(borrartask)

    
}