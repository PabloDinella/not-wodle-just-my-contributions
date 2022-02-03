#!/bin/bash

cd ..
git checkout gh-pages
rm -rf docs
cp -r front/dist docs
git add .
git commit -m "deploy"
git push origin gh-pages -f
git checkout main
rm -rf docs
cd front