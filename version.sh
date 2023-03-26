set -e
node version.js $1
npm run lint:fix
