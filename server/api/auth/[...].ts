import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.AUTH_SECRET,
    encode: ({ secret, token }) => {
      return token ? JSON.stringify(token) : ''
    },
    decode: ({ secret, token }) => {
      return token ? JSON.parse(token) : null
    }
  },
  providers: [{
    id: 'oci-iam',
    name: 'Oracle',
    type: 'oauth',
    clientId: config.ociClientId,
    clientSecret: config.ociClientSecret,
    wellKnown: `${config.ociDomainUrl}${config.ociWellKnownUrl}`,
    authorization: {
      params: {
        scope: config.ociScope
      }
    },
    userinfo: {
      url: `${config.ociDomainUrl}${config.ociUserinfoUrl}`,
      async request({ tokens }) {
        const response = await fetch(`${config.ociDomainUrl}${config.ociUserinfoUrl}`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`
          }
        })
        const userInfo = await response.json()
        return userInfo
      }
    },
    idToken: true,
    checks: ['pkce', 'state'],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email
      }
    }
  }],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id
        token.name = profile.name
        token.email = profile.email
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.accessToken = token.accessToken
        session.idToken = token.idToken
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('logout')) {
        const logoutUrl = `${config.ociDomainUrl}${config.ociLogoutUrl}`
        const params = new URLSearchParams({
          post_logout_redirect_uri: process.env.AUTH_ORIGIN,
          id_token_hint: url.split('=')[1]
        })
        return `${logoutUrl}?${params.toString()}`
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
})
