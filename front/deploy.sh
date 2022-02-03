#!/bin/bash

git checkout gh-pages
find . ! -name 'dist' -type d -exec rm -rf {} +
mv dist/* ./
rm -rf dist
git push origin gh-pages -f