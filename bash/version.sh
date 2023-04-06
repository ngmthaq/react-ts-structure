set -e

node version.js $1

if [ $1 ]
then
    npm run lint:version
fi
