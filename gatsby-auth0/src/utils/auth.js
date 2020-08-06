import auth0 from "auth0-js"

const isBrowser = typeof window !== "undefined"

const tokens = {
  idToken: false,
  accessToken: false,
}

let user = {}

export const isAuthenticated = () => {
  return tokens.idToken !== false
}

// Only instantiate Auth0 if we’re in the browser.
const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

// allow for calback to be passed through
const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    if (err.error === "login_required") {
      login()
    }
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    tokens.idToken = authResult.idToken
    tokens.accessToken = authResult.accessToken

    auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
      user = userProfile

      cb()
    })
  }
}

export const checkSession = callback => {
  auth.checkSession({}, setSession(callback))
}

export const handleAuthentication = () => {
  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}
