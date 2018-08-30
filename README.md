# Discourse-js

## Table of Contents

- Installation
- Quick Start
- License

### Installation

_note_: This is currently psuedocode.

```bash
$ npm i discourse-js
```

### Local Development

This is if you are developing the `discourse-js` API locally on your machine.

```bash
# Clone the repo
$ git clone git@gitlab.com:theworkshop/discourse-js.git
$ cd discourse-js
# Run npm link to create a global symlink to the local "discourse-js" project
$ cd <to-your-testing-environment/or-app>
$ npm link discourse-js
```

### Quick Start

```js
import Discourse from 'discourse-js'

const apiKey = "<api-key-from-discourse>"
const baseUrl = "<your-discourse-url>" || "http://localhost:3000";

const discourse = new Discourse(apiKey, baseUrl);

discourse.posts.create({
  api_username: 'karluser',
  topic_id: 11,
  raw: "Hello World"
})
.then(res => console.log(res))
.catch(err => console.log(err))
```

### License

MIT
