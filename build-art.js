const fs = require('fs');
const sharp = require('sharp');

console.log('Sharp Versions:');
console.log(sharp.versions);
console.log(`Sharp Concurrency: ${sharp.concurrency()}`);

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

/**
 * Apply a sharp operation to all of the pictures in a directory, and write
 * the output to a different directory.
 *
 * @param dirPath WHere to find the input pictures.
 *
 * @param outputDirPath Where to put the output pictures. (This directory will
 *   be created if it does not already exist.)
 *
 * @param sharpOperations A function that takes a path to an image file,
 *   applies some operations to it, and returns a Sharp object.
 */
async function processDirectory(dirPath, outputDirPath, sharpOperations) {
  console.log(`Processing ${dirPath} to ${outputDirPath}`);
  await fs.promises.mkdir(outputDirPath, { recursive: true });

  const dir = await fs.promises.opendir(dirPath);

  for await (const dirEntry of dir) {
    if (dirEntry.isFile()) {
      const filePath = `${dirPath}/${dirEntry.name}`;
      const outputFilePath = `${outputDirPath}/${dirEntry.name}`;
      const info = await sharpOperations(filePath).toFile(outputFilePath);
      console.log(`Processed ${filePath} to ${outputFilePath} (${info.size} bytes)`);
    }
  }
  console.log(`Done Sharp processing ${dirPath} to ${outputDirPath}`);
  await imagemin([`${outputDirPath}/*.png`], {
    destination: outputDirPath,
    plugins: [
        imageminPngquant({
            quality: [0.3, 0.8]
        })
    ]
  });
  console.log(`Done imagemin processing ${dirPath} to ${outputDirPath}`);
}

const originalDir = 'art';
const resizedDir = 'art-resized';

for (const dirName of ['bees', 'flowers', 'nests']) {
  const dirPath = `${originalDir}/${dirName}`;

  processDirectory(dirPath, `${resizedDir}/500w/${dirName}`, (file) =>
    sharp(file).resize({width: 500})
  );
}

for (const dirName of ['flowers', 'nests']) {
  const dirPath = `${originalDir}/${dirName}`;

  processDirectory(
    dirPath,
    `${resizedDir}/512-square/${dirName}`,
    (file) => sharp(file).resize({
      width: 512,
      height: 512,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
  );
  processDirectory(
    dirPath,
    `${resizedDir}/512-square-grayscale/${dirName}`,
    (file) => sharp(file).grayscale().resize({
      width: 512,
      height: 512,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
  );
}

const backgroundPath = `${originalDir}/other/hill.jpg`;
fs.mkdirSync(`${resizedDir}/other`, {recursive: true});
for(const width of [1000, 2000, 4000]) {
  const outputPath = `${resizedDir}/other/hill-${width}w.jpg`;
  sharp(backgroundPath)
    .resize({width})
    .toFile(outputPath)
    .then((info) => console.log(`Processed ${backgroundPath} to ${outputPath} (${info.size} bytes)`));
}


