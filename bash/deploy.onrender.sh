set -e

current_date=`date -u`

yarn build:linux

cd ./build

git init

git add --all

git commit -m "Auto deploy from bash ($current_date UTC)"

git branch -M main

git push -f https://github.com/ngmthaq/react-ts-onrender.git main
