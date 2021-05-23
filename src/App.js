import React, {useState, useEffect} from 'react';
import './App.css';
import TypeManager from "./TypeManager";
import Modal from "./Modal";
import { facts } from "./facts"
import PdfButton from "./pdf/PdfButton"
import Button from './Button';

function genRandomString() {
    const shuffled = facts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2).join(' ');
}

function App() {
    const [curIndex, setCurIndex] = useState(0);
    const [type, setType] = useState('default');
    const [show, setShow] = useState(true);
    const [secCount, setSecCount] = useState(1);
    const [typedWords, setTypedWords] = useState(0);
    const [testPassed, setTestPassed] = useState(false);
    const [string, setString] = useState(() => {
        return genRandomString()
    });

    const containsSpecialCharacters = str => {
        const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        return regex.test(str);
    }

    const keyPressHandler = event => {
        if (string[curIndex] === event.key) {
            setCurIndex(curIndex => curIndex + 1);
            setType('default');
            if (containsSpecialCharacters(string[curIndex]) && !containsSpecialCharacters(string[curIndex - 1])) {
                setTypedWords(typedWords => typedWords + 1)
            }
            if (curIndex === string.length - 1) {
                setTestPassed(true);
                setShow(true);
            }
        } else {
            setType('danger');
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', keyPressHandler);
        return () => {
            window.removeEventListener('keypress', keyPressHandler)
        }
    });

    const current = string.substring(curIndex, curIndex + 1);
    const before = curIndex ? string.substring(0, curIndex) : '' ;
    const after = string.substring(curIndex + 1);

    const start = () => {
        setString(genRandomString());
        setShow(false);
        setCurIndex(0);
        setTestPassed(false);
        setTypedWords(0);
        setType('default');
    }

    const cancel = React.useCallback(() => setShow(true), [show]);

    const getTime = React.useCallback(time => setSecCount(time), [show]);

    const renderModalContent = () => {
        const minutes = secCount / 60;
        const wpm = typedWords / minutes;
        return testPassed ?
            <div className="intro_text">
                <p>minutes: {minutes.toFixed(2)}</p>
                <p>words: {typedWords}</p>
                {`Words Per Minute is ${wpm.toFixed(2)}`}
                <div className="result_manager_block">
                    <Button text="Start" start={start} />
                    <PdfButton minutes={minutes} typedWords={typedWords}/>
                </div>
            </div> :
            <div className="intro_text">
                <p>How many WPM (Words Per Minute) could you type ?</p>
                <p>Please type all proposed text!)</p>
                <Button text="Start" start={start} />
            </div>
    }

    return (
        <div className="App">
            <div className="main_text">
                <p>
                    {before}
                    <span className={`cur_char_${type}`}>{current}</span>
                    {after}
                </p>
            </div>
            <TypeManager cancel={cancel} cancelTimer={show} getTime={getTime} testPassed={testPassed}/>
            <Modal show={show} >
                {renderModalContent()}
            </Modal>
        </div>
    );
}

export default App;