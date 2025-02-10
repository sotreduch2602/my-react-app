import { useState } from 'react';

const Form = () => {
    const [value, setValue] = useState('');
    const [list, setList] = useState(['abc', 'xyz']);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClick = () => {
        setList([...list, value]);
        setValue('');
    }

    return (
        <>
            <input type='text' onChange={handleChange} value={value} />
            <button onClick={handleClick}>Add</button>

            <ul>
                {
                    list.map((item, index) =>
                        <li key={index}>
                            {item}
                        </li>
                    )
                }
            </ul>
        </>
    );
}

export default Form;