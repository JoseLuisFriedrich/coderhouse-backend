import express, { Application, Request, Response } from 'express'

const PORT = 8000
const app: Application = express()

app.use(express.json())

interface Product {
  id: number
  name: string
  price: number
}

let products: Array<Product> = [
  { id: 1, name: 'Refined Steel Table', price: 45 },
  { id: 2, name: 'Awesome Soft Gloves', price: 45 },
  { id: 3, name: 'Fantastic Fresh Towels', price: 45 },
]

const addProduct = (product: Product) => {
  products = [...products, product]
  console.log(products)
  return product
}

app.post('/products', (req: Request, res: Response) => {
  const id = products.length + 1
  const { name, price } = req.body
  //console.log(body)

  const result = addProduct({ id, name, price })
  res.status(200).send(result)
})

app.get('/products', (req: Request, res: Response) => {
  res.status(200).send(products)
})

app.delete('/products/:id', (req: Request, res: Response) => {
  const { id } = req.params
  products = products.filter(p => p.id !== Number(id))
  res.status(200).send(products)
})

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'))

app.listen(PORT, () => {
  console.log(`⚡️ http://localhost:${PORT}`)
})
