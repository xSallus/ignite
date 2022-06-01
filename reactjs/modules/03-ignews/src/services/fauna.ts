import faunadb from "faunadb";

const index = "get_user";
const collection = "Users";

const config = { 
  secret: process.env.FAUNA_KEY as string,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: "https" as "https"
}

const client = new faunadb.Client(config);
const q = faunadb.query;

export { client, q, collection, index }
