#!/bin/bash

input=$1
timeout=$2

if [ "" == "$input" ]
then
  echo "File to set timeout in not specified"
  exit 1
fi

if [ "" == "$timeout" ]
then
  echo "Timeout not specified"
  exit 1
fi

echo "Changing timeout to $timeout in $input"

sed "s/\"timeout\":.*$/\"timeout\": $timeout/" $input > /tmp/x
mv /tmp/x $input
