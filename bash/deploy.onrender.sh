set -e

current_date=`date -u`

# $1 : win | linux
yarn build:$1

cd ./build

git init

git add --all

git commit -m "Auto deploy from bash ($current_date UTC)"

git branch -M main

git push -f https://github.com/ngmthaq/react-ts-onrender.git main
