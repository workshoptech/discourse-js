export default function Topics(discourse) {
  this.getTopic = ({ id } = {}) => {
    return new Promise((resolve, reject) => {
      if (!id)
        return reject(new Error('No id defined. You must pass an id to the getTopic function.'))

      discourse
        .DiscourseResource({
          path: `t/${id}.json`,
          method: 'GET'
        })
        .then(response => resolve(response))
        .catch(function(error) {
          if (error) {
            return reject(new Error(error))
          }
        })
    })
  }
}
