export interface GetGroupsData {
  members: [
    {
      id: number,
      username: string,
      avatar_template: string,
    },
  ];
  owners: [{}];
  meta: {
    total: number,
    limit: number,
    offset: number,
  };
}
