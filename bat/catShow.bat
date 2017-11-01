cd ..
call grunt compress:categoriesShow
cd restApi2/categories/show
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
pause