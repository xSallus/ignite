const token = process.env.VUE_APP_CMS_TOKEN;
const cmsUri = "https://graphql.datocms.com/";

function getDataFromCMS(query, callback) {
  fetch(
    cmsUri,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ query })
    }
  )
  .then(res => res.json())
  .then(res => callback(res.data.allPosts))
  .catch(err => console.log(err));
}

export { getDataFromCMS };
