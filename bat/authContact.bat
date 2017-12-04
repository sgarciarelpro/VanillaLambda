cd ..
call grunt compress:authContact
cd restApi2/authentication/contact
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat