import React from "react";

const Button = ({ start, text }) => {
    return (
        <button type="button" className="button" onClick={start}>
      {text}
    </button>
    );
};

export default Button;