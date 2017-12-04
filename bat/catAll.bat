cd ..
call grunt compress:categoriesAll
cd restApi2/categories/all
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
