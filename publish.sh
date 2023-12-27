`#!/usr/bin/env sh

# abort on 
set -e

# build
npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:boldak/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/Kkrinch/edu_db_labs.git main:gh-pages

cd -
