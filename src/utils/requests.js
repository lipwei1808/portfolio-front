export function getCookie() {
  return document.cookie.split("=")[1];
}

export function signup(body) {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function login(body) {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export function refreshToken() {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/refresh-token`, {
    method: "post",
    credentials: "include",
  });
}

export function verify() {
  let token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/verify`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function logout() {
  document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  return fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
    method: "post",
    credentials: "include",
  });
}

// requires auth
export function editProfile(body) {
  let token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/edit-profile`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function editBalance(body) {
  let token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/edit-balance`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getBalance() {
  let token = getCookie();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/user/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// ------------------------------------------------// NOT COMPLETED
// requires auth
export function forgotPassword(email) {
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.FIREBASE_REST_API_KEY}`,
    {
      method: "post",
      body: JSON.stringify({ email: email, requestType: "PASSWORD_RESET" }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
