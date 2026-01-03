import path from 'path';

export default function indexTemplate(filePaths) {
  const exportEntries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const safeName = /^\d/.test(basename) ? `_${basename}` : basename;
    const exportName = `${safeName}Icon`;
    return `export { default as ${exportName} } from './${basename}'`;
  });
  return exportEntries.join('\n');
}
