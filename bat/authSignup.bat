cd ..
call grunt compress:authSignup
cd restApi2/authentication/signup
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat