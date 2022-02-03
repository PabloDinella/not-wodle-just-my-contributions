#!/bin/bash

git checkout gh-pages
cd ..
rm -rf docs
cp -r front/dist docs
# git add .
# git commit -m "deploy"
# git push origin gh-pages -f