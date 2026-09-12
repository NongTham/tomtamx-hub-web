import { readContent } from './content.js';
try {
  readContent();
  console.log('Content OK: site and suite settings. Scripts load live from Rscripts.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
