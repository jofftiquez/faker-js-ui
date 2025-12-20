const nodeFs = require('node:fs');
const readFile = nodeFs.readFile;
const writeFileSync = nodeFs.writeFileSync;
const serverFunctionName = 'nuxtSSRHandler';

readFile('.output/server/index.mjs', 'utf-8', (errRead, contents) => {
  if (errRead) {
    return console.error(errRead);
  }

  console.log('Found index.mjs file contents:', contents);

  const updated = contents.replace(
    /{ s as server }/gi,
    '{ s as ' + serverFunctionName + ' }',
  );

  console.log('Replacing nuxt server function name with ' + serverFunctionName);

  writeFileSync('.output/server/index.mjs', updated, 'utf-8');
});
