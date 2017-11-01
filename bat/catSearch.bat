cd ..
call grunt compress:categoriesSearch
cd restApi2/categories/search
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
pause