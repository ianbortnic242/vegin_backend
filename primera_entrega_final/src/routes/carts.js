import {Router} from "express"
import cartController from '../controller/carts'

const cartsRouter = Router();


cartsRouter.post("/", async (req, res) => {

    const id = await cartController.createCart();
    res.json({
        msg: `El ID del carrito creado es: ${id}`,
    });

});


cartsRouter.delete("/:id", async (req, res) => {

    const id = req.params.id;

    await cartController.deleteCart(id);

    res.json({
        msg: `El carrito con Id: ${id} se a eliminado correctamente`,
    });

});


cartsRouter.get("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const products = await cartController.productsByCartId(id);

    res.json({
        products,
    });
});

cartsRouter.post("/:id/productos", async (req, res) => {
    const idCart = req.params.id;
    console.log(idCart)
    const { id } = req.body;
    await cartController.addProductToCart(idCart, id);

    res.json({
        msg: `El producto con id:${id} se ha agregado correctamente al cart con id: ${idCart}`,
    });
}
);


cartsRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    const idCart = req.params.id;
    const idProduct = req.params.id_prod;

    await cartController.deleteProductToCart(idCart, idProduct);

    res.json({
        msg: `El producto con id: ${idProduct}, fue eliminado del carrito: ${idCart}`,
    });
}
);

export default cartsRouter;