import * as Yup from 'yup';
import Products from '../models/Products';
import Category from '../models/Category';

class ProductController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            cotegory_id: Yup.number().required(),
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { filename: path } = req.file;
        const { name, price, cotegory_id } = req.body;

        const products = await Products.create({
            name,
            price,
            cotegory_id,
            path,
        });

        return res.json(products);
    }

    async index(req, res) {
        const products = await Products.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
            ],
        });

        return res.json(products);
    }
}
export default new ProductController();
