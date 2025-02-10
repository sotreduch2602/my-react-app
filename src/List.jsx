const List = () => {
    let students = [
        { name: 'Andy', age: 18, gpa: 7.5 },
        { name: 'Brand', age: 20, gpa: 4.2 },
        { name: 'Chris', age: 18, gpa: 10.0 },
        { name: 'Doran', age: 19, gpa: 6.1 }
    ];

    return (
        <>
            <table className='table table-light table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th>Họ tên</th>
                        <th>Tuổi</th>
                        <th>Điểm TB</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(s =>
                            <tr>
                                <td>{s.name}</td>
                                <td>{s.age}</td>
                                <td>{s.gpa}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default List;