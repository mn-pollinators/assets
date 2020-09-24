const {nests} = require('../nests.json');

describe('The nest JSON data', () => {
  for (const [id, nest] of Object.entries(nests)) {
    describe(id, () => {
      it('Has only one name, not two names separated by "or"', () => {
        expect(nest.name).not.toMatch(/\bor\b/);
      });
    });
  }
});
