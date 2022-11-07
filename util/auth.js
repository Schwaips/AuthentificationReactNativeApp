// send request out of component.
import axios from "axios";

const API_KEY = "AIzaSyA91mmbdRe36kyASGvsldh_ggn1GMS4ki8";

async function authenticate(mode, email, password) {
  // with async function we make sure the method returns a Promise
  // that will resolve once the request (response) is done.
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

// send request to firebase to create user
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

// send request to firebase to login
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
