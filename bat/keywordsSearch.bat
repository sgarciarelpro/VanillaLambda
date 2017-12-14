cd ..
call grunt compress:keywordsSearch
cd restApi2/keywords/search
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat