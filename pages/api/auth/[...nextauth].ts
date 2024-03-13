import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function auth(req:NextApiRequest, res:NextApiResponse) {
    const providers = [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ]
    const handler = NextAuth({
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            }),
        ],
    })

    // @ts-ignore
    if (req.query.nextauth.includes("callback")) {
        if (req.method === "POST") {
            console.log(
                "Handling callback request from my Identity Provider",
                req.body
            )
        }
    }


    // @ts-ignore
    const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

    // Will hide the `GoogleProvider` when you visit `/session/auth/signin`
    if (isDefaultSigninPage) providers.pop()

    // @ts-ignore
    return  NextAuth(req, res, {
        handler
    })
    
    const someCookie = req.cookies["some-custom-cookie"]


    // @ts-ignore
    // @ts-ignore
    return NextAuth(req, res, {
        "handler": handler,
        "callbacks": {
            // @ts-ignore
            session: function ({session, token: token}) {
                // Return a cookie value as part of the session
                // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
                session.someCookie = someCookie
                return session
            }
        }
    });
}




/*
          handlers: { GET: httpHandler, POST: httpHandler } as const,
      // @ts-expect-error
      auth: initAuth(config, (c) => setEnvDefaults(c)),

      signIn: (provider, options, authorizationParams) => {
        const _config = config(undefined)
        setEnvDefaults(_config)
        return signIn(provider, options, authorizationParams, _config)
      },
      signOut: (options) => {
        const _config = config(undefined)
        setEnvDefaults(_config)
        return signOut(options, _config)
      },
      unstable_update: (data) => {
        const _config = config(undefined)
        setEnvDefaults(_config)
        return update(data, _config)
      },
    }

 */

/*
import type { NextApiRequest, NextApiResponse } from "next"
import GithubProvider from "next-auth/providers/github"

import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
})
export default async function auth(req: NextApiRequest, res: NextApiResponse) {

    // @ts-ignore
    if(req.query.nextauth.includes("callback") && req.method === "POST") {
        console.log(
            "Handling callback request from my Identity Provider",
            req.body
        )
    }

    // Get a custom cookie value from the request
    const someCookie = req.cookies["some-custom-cookie"]

    return  NextAuth( {
                     providers: [
                         GithubProvider({
                             clientId: process.env.GITHUB_ID,
                             clientSecret: process.env.GITHUB_SECRET,
                         }),
                     ],
            callbacks: {
        session({ session, token }) {
            // Return a cookie value as part of the session
            // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
            session.someCookie = someCookie
            return session
        }
    }
})
}

/*
//import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import type { NextApiRequest, NextApiResponse } from 'next'

import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
})

const GET = handler;
const POST = handler;


export default { GET, POST }
/*

const handler =   NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
})
export { handler as GET, handler as POST }

export default handler(){

};
*/
/*export default function catchAll(req: NextApiRequest, res: NextApiResponse) {
    const GET = handler;
    const POST = handler;

    return "<div></div>"
}*/
//https://next-auth.js.org/configuration/initialization#route-handlers-app
//vs - https://authjs.dev/getting-started/providers/oauth-tutorial
// vs - https://nextjs.org/docs/pages/building-your-application/routing/api-routes#catch-all-api-routes