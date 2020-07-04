export const datasets = [
   {
      label: "Karma Points",
      data: [100, 500, 100, 200, 600, 300, 400],
   },
];

export const labels = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
];

export const tableData = new Array(500).fill(null).map((_, index) => {
   return {
      name: `name${index}`,
      age: Math.floor(Math.random() * 100),
      friend: {
         name: `friend.Name${index}`,
         age: Math.floor(Math.random() * 100),
      },
   };
});

export const tableColumns = [
   {
      Header: "Name",
      accessor: "name", // String-based value accessors!
   },
   {
      Header: "Age",
      accessor: "age",
   },
   {
      Header: "Friend Name",
      accessor: "friend.name",
   },
   {
      Header: "Friend Age",
      accessor: "friend.age",
   },
];
