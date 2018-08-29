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
