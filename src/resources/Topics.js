export default function Topics(discourse) {
  this.getTopic = ({ id } = {}) => {
    return new Promise((resolve, reject) => {
      if (!id)
        return reject(
          new Error(
            "No id defined. You must pass an id to the getTopic function."
          )
        );

      discourse
        .DiscourseResource({
          path: `t/${id}.json?api_key=${discourse._API_KEY}&api_username=${
            discourse._API_USERNAME
          }`,
          method: "GET"
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
