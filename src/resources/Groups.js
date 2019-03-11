export default function Groups(discourse) {
  this.getMembers = ({ group_name }) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "GET",
          path: `groups/${group_name}/members.json?api_key=${discourse._API_KEY}&api_username=${
            discourse._API_USERNAME
          }`,
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
