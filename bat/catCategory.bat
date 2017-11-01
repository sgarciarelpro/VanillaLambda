cd ..
call grunt compress:categoriesCategory
cd restApi2/categories/category
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
pause