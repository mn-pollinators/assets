const {bees} = require('../bees.json');
const {flowers} = require('../flowers.json');
const {nests} = require('../nests.json');
const fs = require('fs');

function testArtFiles(id, object, dir) {
  it(`${id} art file should exist`, () => {
    const art_file = `art/${dir}/${object.art_file}`;
    expect(fs.existsSync(art_file)).withContext(`File: ${art_file}`).toBeTrue();
  });
}

function testDirectory(dir, objects) {
  describe(`In the ${dir} art directory,`, () => {
    const artDir = `art/${dir}`;
    const files = fs.readdirSync(artDir);
    const artFiles = Object.values(objects).map(x => x.art_file);
    for(const file of files) {
      it(`${file} should be referenced in the JSON`, () => {
        expect(artFiles).toContain(file);
      });
    }
  });
}

describe('Bees:', () => {
  for (const [id, bee] of Object.entries(bees)) {
    testArtFiles(id, bee, 'bees');
  }
  testDirectory('bees', bees);
});

describe('Flowers:', () => {
  for (const [id, flower] of Object.entries(flowers)) {
    testArtFiles(id, flower, 'flowers');
  }
  testDirectory('flowers', flowers);
});

describe('Nests:', () => {
  for (const [id, nest] of Object.entries(nests)) {
    testArtFiles(id, nest, 'nests');
  }
  testDirectory('nests', nests);
});
