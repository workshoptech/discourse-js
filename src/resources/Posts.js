export default function Posts(discourse) {

  this.create = (username, topic_id, raw) => new Promise((resolve, reject) => {
    if (!username) return reject(new Error('No username defined. You must pass a topic to create function.'));
    if (!topic_id) return reject(new Error('No topic_id defined. You must pass a topic to create function.'));

    fetch(`${discourse._BASE_URL}/posts?${discourse._API_KEY}`, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: {
        username,
        topic_id,
        raw
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText, response.status);
      }
    })
    .then(function (data) {
      resolve(data)
    })
    .catch(function (error) {
      reject(error)
    });
  })

  this.reply = () => new Promise((resolve, reject) => {
    console.log('Reply')
    resolve('Reply')
  })

  this.like = () => new Promise((resolve, reject) => {

  })
}