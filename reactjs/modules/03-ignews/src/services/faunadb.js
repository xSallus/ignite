import faunadb from "faunadb";

const index = "get_user";
const collection = "Users";

const config = { 
  secret: process.env.VUE_APP_FAUNA_KEY,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: "https"
}

const client = new faunadb.Client(config);
const q = faunadb.query;

async function saveUser({ username, email }) {
  const newUserRef = await client.query(
    q.If(
      q.Not(
        q.Exists(
          q.Match(
            q.Index(index),
            q.Casefold(email)
          )
        )
      ),
      q.Create(
        q.Collection(collection),
        { data: { username, email } }
      ),
      q.Get(
        q.Match(
          q.Index(index),
          q.Casefold(email)
        )
      )
    )
  );

  return {
    ...newUserRef['data'],
    id: newUserRef['ref'].value.id,
  }
}

export { saveUser };
