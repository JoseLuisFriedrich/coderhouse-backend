import fs from 'fs'
import { Message } from './../models/chat'
import { products } from './product'

let messages: Array<Message> = []

const messagesFile = '../messages.json'
if (fs.existsSync(messagesFile)) {
  const content: string = fs.readFileSync(messagesFile, 'utf-8')
  messages = JSON.parse(content)
}

const socketIo = (io: any) => {
  io.on('connection', (socket: any) => {
    socket.emit('chat', [...messages, { date: new Date().toLocaleTimeString(), user: 'Admin', text: 'Bienvenido!' }])

    if (products.length > 0) socket.emit('products', products)

    socket.on('chat', (message: Message) => {
      // socket.broadcast.emit -> emits all connected sockets except the one it is being called on.
      // io.sockets.emit -> emits all connected sockets.
      message.date = new Date().toLocaleTimeString()

      //add
      messages = [...messages, message]

      //save
      fs.promises.writeFile(messagesFile, JSON.stringify(messages, null, 2), { encoding: 'utf8' })

      //emit
      io.sockets.emit('chat', [message])
    })
  })
}

export default socketIo
