cd ..
call grunt compress:geocodeDistance
cd restApi2/geocode/distance
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat