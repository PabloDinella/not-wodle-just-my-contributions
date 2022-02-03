#!/bin/bash

git checkout gh-pages
rm -rf docs
cp -r dist docs
# git add .
# git commit -m "deploy"
# git push origin gh-pages -f