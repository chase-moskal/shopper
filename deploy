#!/bin/bash

branch=${1?"1st arg 'branch' is required"}

git checkout master
git checkout -b $branch

sed -i 's/\/dist/\# \/dist/g' .gitignore
git add .gitignore
git commit -m "unignore dist for deployment"

npm install
git add .
git commit -m "deploy"

splitbranch="$branch-split"
subtree=$(git subtree split --prefix dist -b $splitbranch)
git push origin $splitbranch:$branch --force

git checkout master
git branch -D $branch $splitbranch

git status
echo "Deployment complete"
