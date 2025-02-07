const List = () => {
  let student = [
    {
      name: "John",
      age: 25,
      gpa: 3.5,
    },
    {
      name: "John",
      age: 25,
      gpa: 3.5,
    },
    {
      name: "John",
      age: 25,
      gpa: 3.5,
    },
    {
      name: "John",
      age: 25,
      gpa: 3.5,
    },
    {
      name: "John",
      age: 25,
      gpa: 3.5,
    },
  ];
  return (
    <>
      <table className="table table-light table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {student.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.gpa}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
