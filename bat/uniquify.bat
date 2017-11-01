cd ..
call grunt compress:uniquify
cd restApi2/uniquify/companies
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
pause