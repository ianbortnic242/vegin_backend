import {Router} from 'express'
import productController from '../controller/products'
import {auth} from '../config/index'

const productsRouter = Router();

productsRouter.post('/', auth, async (req, res) => {
  const body = req.body;

  const new_product = {
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
  };

  await productController.save(new_product);
  res.json({
    msg: 'El producto se agrego correctamente'
})
});


productsRouter.get('/', async (req, res) => {

  const products = await productController.getAll()
  res.json({
    products
  })
})


productsRouter.get('/:id', async (req, res) => {

  const id = req.params.id
  const product = await productController.getById(id)
  res.json({
    product
  })
})

productsRouter.put('/:id', auth,  async (req, res, next) => {

    const id = req.params.id
    const { body } = req
    await productController.updateByID(id, body)

    res.json({
        msg: ` El producto con id ${id} se modificó correctamente`
    })
}
)



productsRouter.delete('/:id', auth, async (req, res) => {

    const id =  req.params.id

    await productController.deleteById(id)

    res.json({
        msg: `El producto con id: ${id} Se eliminó correctamente `
    })

})

export default productsRouter