module.exports.config = {
  "dev":{
    "region": "us-east-1",
    "resourcesStackName": "restApi2-dev-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-dev-r-IamRoleLambda-1RUOV9DCO8PM1",
    "apiGatewayApi": "restApi2",
    "techSearchEndpoint": "search-domain-tech-search-2017-12-6pxmweujc5aaza3sxvz6h4vxhy.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-11-2017-rgmwnp3znipit7wfe6aadz57bu.us-east-1.cloudsearch.amazonaws.com",
    "stage": "dev",
    "relProBasePath": "/",
    "relProHost": "test.relpro.com"
  },
  "production":{
    "region": "us-east-1",
    "resourcesStackName": "restApi2-production-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-production-r-IamRoleLambda-YHLYTG6Z5UM",
    "apiGatewayApi": "restApi2",
    "techSearchEndpoint": "search-domain-tech-search-2017-11-znygykjoilc6j3sc2ohj62t7gm.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-11-2017-rgmwnp3znipit7wfe6aadz57bu.us-east-1.cloudsearch.amazonaws.com",
    "stage": "production",
    "relProBasePath": "/",
    "relProHost": "app.relpro.com"
  },
  "production2":{
    "region": "us-east-1",
    "resourcesStackName": "restApi2-production2-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-production2-r-IamRoleLambda-XNP0CCXL8RI1",
    "apiGatewayApi": "restApi2",
    "techSearchEndpoint": "search-domain-tech-search-2017-12-6pxmweujc5aaza3sxvz6h4vxhy.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-11-2017-rgmwnp3znipit7wfe6aadz57bu.us-east-1.cloudsearch.amazonaws.com",
    "stage": "production2",
    "relProBasePath": "/",
    "relProHost": "app.relpro.com"
  },
  "prodoregon":{
    "region": "us-west-2",
    "resourcesStackName": "restApi2-prodoregon-r",
    "iamRoleArnLambda": "arn:aws:iam::376679179744:role/restApi2-prodoregon-r-IamRoleLambda-EAB5UK2U74PN",
    "apiGatewayApi": "restApi2-oregon",
    "techSearchEndpoint": "search-domain-tech-search-2017-12-6pxmweujc5aaza3sxvz6h4vxhy.us-east-1.cloudsearch.amazonaws.com",
    "companySearchEndpoint": "search-domain-orb-org-11-2017-rgmwnp3znipit7wfe6aadz57bu.us-east-1.cloudsearch.amazonaws.com",
    "stage": "prodoregon",
    "relProBasePath": "/",
    "relProHost": "app.relpro.com"
  }

};