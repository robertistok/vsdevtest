const fdb = require('./fake_db');

function getNestedProeprties() {}

module.exports = {
  getItem: function(req, res) {
    const { item } = req.params;

    fdb.findByNameUrl([item], (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Bad request', err });
      }

      if (data.length === 0) {
        return res.status(404).send({ message: 'Item not found...' });
      }

      const product = data[0];

      let detailedProductProps;

      fdb.findByName(Object.keys(product.properties), (err, data) => {
        if (err) {
          return res.status(500).send({ message: 'Bad request', err });
        }

        const detailedProductProps = data.reduce((acc, prop) => {
          if (Object.keys(prop).length === 1) {
            return Object.assign({}, acc, {
              [prop.name]: product.properties[prop.name]
            });
          } else if (Object.keys(prop).length === 2) {
            return Object.assign({}, acc, {
              [prop.name]: `${product.properties[prop.name]}${prop.unit}`
            });
          } else {
            return Object.assign({}, acc, { [prop.name]: prop });
          }
        }, {});

        return res.send(
          Object.assign({}, product, { properties: detailedProductProps })
        );
      });
    });
  }
};

const data = [
  {
    name: 'weight',
    unit: 'g'
  },
  {
    name: 'ram',
    unit: 'GB'
  },
  {
    name: 'front_camera_megapixel',
    unit: 'MP'
  }
];
