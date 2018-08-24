/** Discourse JS */
import Posts from './resources/Posts'

const resources = {
  Posts
}
export default class Discourse {
  constructor(apiKey, baseUrl) {
    
    // Set our api key to the Discourse class.
    this._API_KEY = apiKey
    this._BASE_URL = baseUrl

    this.posts = new resources.Posts(this)
  }
}