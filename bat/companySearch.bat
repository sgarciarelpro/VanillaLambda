cd ..
call grunt compress:companySearch
cd restApi2/company/search
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat
pause