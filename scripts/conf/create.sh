#!/bin/bash

platform=$1

if [ "" == "$platform" ]
then
  echo "No platform specified"
  exit 1
fi

for yml in `ls conf/yml/$platform/*.yml`
do
  stem=`basename $yml | sed 's/\.yml//g'`
  stem_dashed=`echo $stem | sed 's/\./-/g'`
  echo "working on $stem..."
  sed "s/{conf}/$stem_dashed/g" ./etc/$platform.json > conf/json/$platform/$stem.json
  ./node_modules/.bin/cbtr-init -i $yml -o conf/json/$platform/$stem.json -u
done
