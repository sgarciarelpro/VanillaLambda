cd ..
call grunt compress:categoriesList
cd restApi2/categories/list
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
pause