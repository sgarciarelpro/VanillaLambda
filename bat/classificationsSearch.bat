cd ..
call grunt compress:classificationsSearch
cd restApi2/classifications/search
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat