export default function Groups(discourse) {
	this.getAllGroups = () => {
		return new Promise((resolve, reject) => {
			discourse
				.DiscourseResource({
					method: "GET",
					path: `groups?api_key=${
						discourse._API_KEY
					}&api_username=${discourse._API_USERNAME}`
				})
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	this.getGroupMembers = ({ group_name }) => {
		return new Promise((resolve, reject) => {
			discourse
				.DiscourseResource({
					method: "GET",
					path: `groups/${group_name}/members.json?api_key=${
						discourse._API_KEY
					}&api_username=${discourse._API_USERNAME}`
				})
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};
}
  