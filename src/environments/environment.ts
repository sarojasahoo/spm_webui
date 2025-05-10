
const baseUrl = 'http://localhost:8080/api';

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
