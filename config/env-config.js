module.exports.config = {
  "dev":{
    "region": "us-east-1",
    "resourcesStackName": "restApi2-dev-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-dev-r-IamRoleLambda-1RUOV9DCO8PM1",
    "apiGatewayApi": "restApi2",
    "techSearchEndpoint": "search-domain-tech-search-2017-10-w6ff7fovvnsa55r3dehac2vkme.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-09-2017-2-xg77llozyqefabuhnr32ieysxa.us-east-1.cloudsearch.amazonaws.com",
    "stage": "dev",
    "relProBasePath": "/",
    "relProHost": "test.relpro.com",
    "techSearchDatabaseHost": "prod1rds-aurora-cluster.cluster-cnoohy1pji2j.us-east-1.rds.amazonaws.com",
    "techSearchDatabaseUserID": "root",
    "techSearchDatabasePassword": "relcaPP!7",
    "techSearchDatabaseName": "hg_data"
  },
  "production":{
    "region": "us-east-1",
    "resourcesStackName": "restApi2-production-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-production-r-IamRoleLambda-YHLYTG6Z5UM",
    "apiGatewayApi": "restApi2",
    "techSearchEndpoint": "search-domain-tech-search-2017-10-w6ff7fovvnsa55r3dehac2vkme.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-09-2017-2-xg77llozyqefabuhnr32ieysxa.us-east-1.cloudsearch.amazonaws.com",
    "stage": "production",
    "relProBasePath": "/",
    "relProHost": "app.relpro.com",
    "techSearchDatabaseHost": "prod1rds-aurora-cluster.cluster-cnoohy1pji2j.us-east-1.rds.amazonaws.com",
    "techSearchDatabaseUserID": "root",
    "techSearchDatabasePassword": "relcaPP!7",
    "techSearchDatabaseName": "hg_data"
  },
  "production2":{
    "region": "us-east-1",
    "resourcesStackName": "restApi2-production2-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-production2-r-IamRoleLambda-XNP0CCXL8RI1",
    "apiGatewayApi": "restApi2",
    "techSearchEndpoint": "search-domain-tech-search-2017-09-iptddcqkbwktt6r2qalzp7b2am.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-09-2017-2-xg77llozyqefabuhnr32ieysxa.us-east-1.cloudsearch.amazonaws.com",
    "stage": "production2",
    "relProBasePath": "/",
    "relProHost": "app.relpro.com",
    "techSearchDatabaseHost": "prod1rds-aurora-cluster.cluster-cnoohy1pji2j.us-east-1.rds.amazonaws.com",
    "techSearchDatabaseUserID": "root",
    "techSearchDatabasePassword": "relcaPP!7",
    "techSearchDatabaseName": "hg_data"
  },
  "prodoregon":{
    "region": "us-west-2",
    "resourcesStackName": "restApi2-prodoregon-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-prodoregon-r-IamRoleLambda-EAB5UK2U74PN",
    "apiGatewayApi": "restApi2-oregon",
    "techSearchEndpoint": "search-domain-tech-search-2017-10-w6ff7fovvnsa55r3dehac2vkme.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-09-2017-2-xg77llozyqefabuhnr32ieysxa.us-east-1.cloudsearch.amazonaws.com",
    "stage": "prodoregon",
    "relProBasePath": "/",
    "relProHost": "app.relpro.com",
    "techSearchDatabaseHost": "prod1rds-aurora-cluster.cluster-cnoohy1pji2j.us-east-1.rds.amazonaws.com",
    "techSearchDatabaseUserID": "root",
    "techSearchDatabasePassword": "relcaPP!7",
    "techSearchDatabaseName": "hg_data"
  }

};