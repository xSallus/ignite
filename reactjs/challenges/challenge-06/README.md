# **UpFi**
Save the data, with photos!

## Setup and run
Clone this repo, then install dependencies by running:
```bash
$ yarn
```
Create a file called .env.local at the root of project folder with these environment variables inside:
```js
// Connection with imgBB
NEXT_PUBLIC_IMGBB_API_KEY
NEXT_PUBLIC_IMGBB_API_ENDPOINT

// Connection with FaunaDB
FAUNA_API_KEY
```

After setup is complete, you're ready to go, just run:
```bash
$ yarn dev
```
## Features

[✓] Upload a photo

[✓] Preview photo upon upload

[✓] Save upload photos url on a database

[✓] Retrieve set of photos from database

[✓] View a photo maximized

> See live footage [here](#).
