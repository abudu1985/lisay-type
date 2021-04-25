import React, {useEffect} from 'react';
import './style.css';
import Timer from "../Timer";

const TypeManager = ({cancel, cancelTimer, getTime, testPassed}) => {

    useEffect(() => {
   if (testPassed) cancel();
    }, [testPassed]);

    return (
        <div className="type_manager_block">
            <Timer cancel={cancelTimer} getTime={getTime}/>
            <button className="button" onClick={cancel}>Cancel</button>
        </div>
    );
};

export default TypeManager;
