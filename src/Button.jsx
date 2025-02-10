import { useState } from 'react';

const Button = () => {
    const [x, setX] = useState(0);

    const handleClick = () => {
        setX(x + 1);
    }

    return (
        <>
            <button onClick={handleClick}>
                Click me: {x}
            </button>
        </>
    );
}

export default Button;