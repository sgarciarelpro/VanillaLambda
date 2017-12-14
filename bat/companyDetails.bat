cd ..
call grunt compress:companyDetails
cd restApi2/company/details
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat