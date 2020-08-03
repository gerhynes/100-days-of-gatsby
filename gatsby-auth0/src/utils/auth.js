import auth0 from "auth0-js"

const isBrowser = typeof window !== "undefined"

const tokens = {
  idToken: false,
  accessToken: false,
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
  auth.authorize()
}

export const setSession = authResult => {
  tokens.idToken = authResult.idToken
  tokens.accessToken = authResult.accessToken
}

export const handleAuthentication = () => {
  auth.parseHash((err, authResult) => {
    if (err) {
      throw new Error(err)
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
    }
  })
}
