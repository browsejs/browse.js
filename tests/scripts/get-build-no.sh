#!/bin/bash

commit=`git log | head -n 1 | awk '{print $2}'`
changed=`git status | grep "Changes not staged for commit"`
if [ "$changed" != "" ]
then
    build=$commit"__"`git status | md5`
else
    build=$commit
fi
echo $build
