export default function Groups(discourse) {
  this.getMembers = async ({ group_name }) => {
    return discourse.get({
      path: `groups/${group_name}/members.json`,
    });
  };
}
