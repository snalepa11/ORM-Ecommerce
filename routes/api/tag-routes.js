const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
})
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id)
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


router.post('/', async (req, res) => {
  Tag.create(req.body)
  .then((newCategory) => res.status(200).json(newCategory))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((categoryPut) => res.status(200).json(categoryPut))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    }); 
});

router.delete('/:id', async (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((categoryDelete) => res.status(200).json(categoryDelete))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;
