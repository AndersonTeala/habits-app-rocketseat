import Fastify from 'fastify'
import { Prisma, PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  const habits = await prisma.habit.findMany({
    // where: {
    //   title: {
    //     startsWith: ''
    //   }
    // }
  })

  return habits
})

const port = {
  port: 3333
}

app.listen(port)
.then(() => {
  console.log('Backend running in -> ' + port.port)
})