cd ..
call grunt compress:dcSummaries
cd restApi2/datacoverage/summaries
node updateFunction.js %1
cd ..
cd ..
cd ..
cd bat