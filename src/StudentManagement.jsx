import { useState } from 'react';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        setStudents([...students, student]);
        setStudent({ name: '', age: '', gpa: '' });
    }

    return (
        <>
            <form className='col-md-3'>
                <div className='form-group'>
                    <label>Name:</label>
                    <input type='text' className='form-control' name='name' value={student.name} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Age:</label>
                    <input type='text' className='form-control' name='age' value={student.age} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>GPA:</label>
                    <input type='text' className='form-control' name='gpa' value={student.gpa} onChange={handleChange} />
                </div>
                <button className='btn btn-success' onClick={handleClick}>Add</button>
            </form>

            <table className='table table-light table-striped'>
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((item, index) =>
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.gpa}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default StudentManagement;