import Fastify from 'fastify'
import { Prisma, PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  const habits = await prisma.habit.findMany()
  return habits
})

const opts = {}
app.post('/gravar_titulo', opts, async (request, reply) => {

  const teste = await gravrTitulo(request.body)

  if(teste){
    return {
      success: true,
      message: 'Gravado com sucesso'
    }
  }else{
    return {
      success: false,
      message: 'Ocorreu um erro'
    }
  }

})

async function gravrTitulo(objetoRecebido) {

  objetoRecebido.created_at = new Date();

  try {
    const user = await prisma.habit.create({
      data: objetoRecebido
    })
    return true;
  } catch (error) {
    console.log(error)
  }

  return false
}

const port = {
  port: 3333
}

app.listen(port)
.then(() => {
  console.log('Backend running in -> ' + port.port)
})