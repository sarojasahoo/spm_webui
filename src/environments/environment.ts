// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl = 'http://192.168.0.202:8080/api';

export const environment = {
  production: false,
  apiEndpoints: {

    login        : `${baseUrl}/auth/login`,
    register    : `${baseUrl}/user/register`,
    tokenValidation : `${baseUrl}/auth/token`,

    stockListBaseUrl     : `${baseUrl}/stocksList`,
    stockListUsers    : `${baseUrl}/stocksList/users`,

    // alpha vantage api
    alphaVntgUrl : `${baseUrl}/av/stock`,

    // portfolio api to add or sell stock
    portfolioUrl : `${baseUrl}/portfolio/stock` ,


    userHoldingsUri: `${baseUrl}/portfolio/user/`,

    userDailySummary: `${baseUrl}/portfolio/daily-summary/`
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// src/environments/environment.ts
