import React from 'react';
import './style.css';
import Timer from "../Timer";

function TypeManager({cancel, cancelTimer, getTime}) {
console.log('cancel -> ', cancel);
console.log('cancelTimer -> ', cancelTimer);
    return (
        <div className="type_manager_block">
            <Timer cancel={cancelTimer} getTime={getTime}/>
            <button className="button" onClick={cancel}>Cancel</button>
        </div>
    );
}

export default TypeManager;
