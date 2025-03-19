import amqp from 'amqplib';
import { verifyToken } from '../middlewares/authenticate.js'
import CarDetailsService from '../services/carDetailsService.js'

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    const queue = 'reservation_queue'

    await channel.assertQueue(queue, { durable: true })
    console.log('Aguardando por mensagens de reserva...')

    channel.consume(queue, async (msg) => {
      const reservationData = JSON.parse(msg.content.toString())

      const {carId, data_inicio, data_fim, token} = reservationData

      console.log('Processando reserva:', reservationData)

      const carService = new CarDetailsService()

      const jwtPayload = await verifyToken(token)

      const newReservationData = {
        carId,
        data_inicio,
        data_fim
      };

      const result = await carService.updateAvailability(newReservationData, false, jwtPayload.id)

      if (result.success) {
        console.log('Reserva concluída:', result)
      } else {
        console.log('Falha ao processar a reserva:', result)
      }

      channel.ack(msg);
    }, { noAck: false })

  } catch (error) {
    console.error('Erro ao conectar no RabbitMQ:', error)
  }
}

connectRabbitMQ()
