import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [GitHub,]
})

/*
https://authjs.dev/guides/providers/custom-provider
import type { OIDCConfig } from "@auth/core/providers"

...
providers: [
  {
    id: "my-oidc-provider",
    name: "My Provider",
    type: "oidc",
    issuer: "https://my.oidc-provider.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  } satisfies OIDCConfig
]
...*/