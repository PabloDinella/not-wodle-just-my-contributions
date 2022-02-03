#!/bin/bash

git checkout gh-pages
find . ! -name 'dist' -type f -exec rm -f {} +
mv dist/* ./
rm -rf dist
git push origin gh-pages -f