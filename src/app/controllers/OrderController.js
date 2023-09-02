import * as Yup from 'yup';
import Products from '../models/Products';
import Category from '../models/Category';

class OrderController {
    async store(req, res) {
        const schema = Yup.object().shape({
            products: Yup.array()
                .required()
                .of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    }),
                ),
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const productsId = req.body.products.map(product => product.id);

        const updatesProducts = await Products.findAll({
            where: {
                id: productsId,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        });

        const order = {
            user: {
                id: req.userId,
                name: req.userName,
            },
        };

        return res.status(201).json(updatesProducts);
    }
}
export default new OrderController();
