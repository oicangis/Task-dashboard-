import { NextResponse } from 'next/server';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function traerusuarios() {
   
    //  await prisma.user.create({data: {email: "pedro@gmail.com", nombre: "pedro", password: "croqueta"}}) 
     const usuarios = await prisma.user.findMany()  
     console.log(usuarios)}

     traerusuarios() 

async function GET() {
  const tasks = prisma.task.findMany()
  return NextResponse.json(tasks)
  
}