cd ..
call grunt compress:domainTechnologies
cd restApi2/domain/technologies
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat