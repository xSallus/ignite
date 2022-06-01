# **Ignews**
A newsletter about the Dev World. Subscribe now.

> This readme stands for the upcoming version of this project using NextJS..
> Therefore it's currently writen using VueJS..

## Setup and run
Clone this repo, then install dependencies by running:
```bash
$ yarn
```
Setup the following environment variables in a ` .env.local ` file: 
```js
//Setups connection with Dato CMS
CMS_TOKEN

//Setups connection with FaunaDb
FAUNA_KEY

//Setups GitHub OAuth to use with NextAuth
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET

//Setups Stripe integration for subscription/payments
STRIPE_API_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY
STRIPE_HANDLER_URL
STRIPE_WEBHOOK_SECRET
```

After setup is complete, you're ready to go, just run:
```bash
$ yarn dev
```
## Features

[✓] Login with GitHub

[✓] Perform a checkout/subscription with Stripe.

[✓] Save and update user info on Faunadb.

[✓] Retrieve posts from Dato CMS.

[✓] See full post if subscribed.

[✓] Redirect to post preview if not subscribed.

[✓] Uses Static Site Generation(SSG).

[✓] Use Stripe-Cli to listen to websocket events on Stripe

![.](https://raw.githubusercontent.com/xSallus/ignews/main/src/assets/images/woman.svg)

> See live footage [here](#).
