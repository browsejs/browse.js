#!/bin/bash

BUILD_DIR=.

LIB_DIR=lib

BROWSE_JS=$BUILD_DIR/browse.js
BROWSE_MIN_JS=$BUILD_DIR/browse.min.js

> $BROWSE_JS

echo "(function(ns, undefined) {" > $BROWSE_JS
for module in `cat $LIB_DIR/.order`
do
    echo " " >> $BROWSE_JS
    sed 's/^/    /g' $LIB_DIR/$module >> $BROWSE_JS
done

echo " " >> $BROWSE_JS
echo "})(window.browse = window.browse || {})" >> $BROWSE_JS

sed 's/[ ]*$//g' $BROWSE_JS > .tmp.browse.js
mv .tmp.browse.js $BROWSE_JS

#`which uglifyjs` --mangle=toplevel,eval $BROWSE_JS > $BROWSE_MIN_JS

uglifyjs --mangle=toplevel,eval --compress properties,dead_code,drop_debugger,conditionals,comparisons,evaluate,booleans,loops,unused,hoist_funs,if_return,join_vars,cascade,warnings,negate_iife,drop_console $BROWSE_JS > $BROWSE_MIN_JS
