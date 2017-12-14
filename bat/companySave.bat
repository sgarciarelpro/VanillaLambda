cd ..
call grunt compress:companySave
cd restApi2/company/save
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat