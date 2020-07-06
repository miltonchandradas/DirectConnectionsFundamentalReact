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

export const productColumns = [
   {
      Header: "Category",
      accessor: "CATEGORYNAME", // String-based value accessors!
   },
   {
      Header: "Description",
      accessor: "DESCRIPTION",
   },
   {
      Header: "Price in $",
      accessor: "PRICE",
   },
   {
      Header: "Discount",
      accessor: "DISCOUNTLEVEL",
   },
];

export const serviceColumns = [
   {
      Header: "Category",
      accessor: "CATEGORYNAME", // String-based value accessors!
   },
   {
      Header: "Description",
      accessor: "DESCRIPTION",
   },
   {
      Header: "Estimated Hours",
      accessor: "ESTIMATEDHOURS",
   },
   {
      Header: "Difficulty",
      accessor: "DIFFICULTYLEVEL",
   },
];


export const categories = [
   {
      key: "1",
      text: "Grocery Pickup",
   },
   {
      key: "2",
      text: "Giving Rides",
   },
   {
      key: "3",
      text: "Home Improvement",
   },
   {
      key: "4",
      text: "Tuition",
   },
   {
      key: "5",
      text: "Home Helper",
   },
];
