import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { client, collection, index, q } from "services/fauna";

const clientId = process.env.GITHUB_CLIENT_ID as string;
const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: any) {
      const normalizedUser = {
        github_id: user.id,
        name: user.name,
        avatar: user.image,
        email: user.email,
        login: profile.login,
      };

      try {
        await client.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
									q.Index(index),
									q.Casefold(normalizedUser.email)
								)
              )
            ),
            q.Create(
							q.Collection(collection),
					    { data: { ...normalizedUser } }
						),
            q.Get(
							q.Match(
								q.Index(index), 
								q.Casefold(normalizedUser.email)
							)
						)
          )
        );

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async jwt({ token, profile }: any) {
      profile && (token = { ...token, login: profile.login });

      return token;
    },
    async session({ session, token, user }: any) {
			try {
				const userSubscription = await client.query(
					q.Get(
						q.Intersection([
							q.Match(
								q.Index('subscription_by_user_ref'),
								q.Select(
									'ref',
									q.Get(
										q.Match(
											q.Index(index),
											q.Casefold(token.email)
										)
									)
								)
							),
							q.Match(
								q.Index('subscription_by_status'),
								'active'
							)
						])
					)
				);

				session.user = {
					...token, 
					activeSubscription: userSubscription
				};

				return session;
			} catch (err) {
				session.user = {
					...token,
					activeSubscription: null
				}

				return session;
			}
    },
  }
});
