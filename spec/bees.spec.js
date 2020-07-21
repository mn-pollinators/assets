const {bees} = require('../bees.json');
const {flowers} = require('../flowers.json');

describe('The bee JSON data', () => {
  for (const [name, bee] of Object.entries(bees)) {
    describe(bee.sci_name, () => {
      it('Only accepts flowers that have entries in flowers.json', () => {
        for (const flowerId of bee.flowers_accepted) {
          // We can't use the 'in' operator here, because that would also
          // detect inherited method names like 'toString'.
          expect(flowers.propertyIsEnumerable(flowerId))
            .withContext(`Flower ID: ${flowerId}`)
            .toBeTruthy();
        }
      });
    });
  }
});
