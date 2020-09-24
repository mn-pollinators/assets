const {bees} = require('../bees.json');
const {flowers} = require('../flowers.json');
const {nests} = require('../nests.json');

describe('The bee JSON data', () => {
  for (const [id, bee] of Object.entries(bees)) {
    describe(id, () => {
      it('Has only one common name, not two common names separated by "or"', () => {
        expect(bee.name).not.toMatch(/\bor\b/);
      });

      it('Only accepts flowers that have entries in flowers.json', () => {
        for (const flowerId of bee.flowers_accepted) {
          // We can't use the 'in' operator here, because that would also
          // detect inherited method names like 'toString'.
          expect(flowers.propertyIsEnumerable(flowerId))
            .withContext(`Flower ID: ${flowerId}`)
            .toBeTruthy();
        }
      });

      it('Has a nest that has an entry in nests.json', () => {
        expect(nests.propertyIsEnumerable(bee.nest_type))
          .withContext(`Nest type: ${bee.nest_type}`)
          .toBeTruthy();
      })
    });
  }
});
