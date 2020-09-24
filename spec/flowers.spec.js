const {flowers} = require('../flowers.json');

describe('The flower JSON data', () => {
  for (const [id, flower] of Object.entries(flowers)) {
    describe(id, () => {
      it('Has only one common name, not two common names separated by "or"', () => {
        expect(flower.name).not.toMatch(/\bor\b/);
      });
    });
  }
});
