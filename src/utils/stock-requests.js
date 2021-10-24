import { getCookie } from "./requests";

export function addStock(body) {
  let token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/stocks`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getStocks() {
  let token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/stocks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getQuote(ticker) {
  return fetch(
    `${process.env.REACT_APP_QUOTE_LINK}/${ticker}/quote?token=${process.env.REACT_APP_IEX_KEY}`
  );
}

export function getPortfolio() {
  const token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/portfolio`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addPortfolio(name) {
  const token = getCookie();

  return fetch(`${process.env.REACT_APP_SERVER_URL}/portfolio`, {
    method: "post",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deletePortfolio(portfolioId) {
  const token = getCookie();

  return fetch(`${process.env.REACT_APP_SERVER_URL}/portfolio`, {
    method: "delete",
    body: JSON.stringify({ portfolioId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeStock(stockId) {
  const token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/stocks`, {
    method: "delete",
    body: JSON.stringify({ stockId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getConsolidatedStocks(portfolio) {
  const token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/stocks/portfolio`, {
    method: "post",
    body: JSON.stringify({ portfolio }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getDistribution() {
  const token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/stocks/distribution`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
