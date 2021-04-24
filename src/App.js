import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import TypeManager from "./TypeManager";
import Modal from "./Modal";

// const string = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
//             deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non
//             fuga omnis a sed impedit explicabo accusantium nihil doloremque`;

const string = `Lorem ipsum dolor sit amet,`;

function App() {
  const [curIndex, setCurIndex] = useState(0);
  const [type, setType] = useState('default');
  const [show, setShow] = useState(true);
    const [secCount, setSecCount] = useState(1);
    const [typedWords, setTypedWords] = useState(0);
    const [testPassed, setTestPassed] = useState(false);

    const keyPressHandler = event => {
      if (string[curIndex] === event.key) {
        setCurIndex(curIndex => curIndex + 1);
        setType('default');
        if (string[curIndex +1] === ' ') {
            setTypedWords(typedWords => typedWords + 1)
        }
        if (curIndex === string.length + 1) {
            setTestPassed(true);
            setShow(true);
        }
      } else {
        setType('danger');
      }
    }

    useEffect(() => {
        window.addEventListener('keypress', keyPressHandler)
        return () => {
           window.removeEventListener('keypress', keyPressHandler)
        }
    });

    const current = string.substring(curIndex, curIndex + 1);
    const before = curIndex ? string.substring(0, curIndex) : '' ;
    const after = string.substring(curIndex + 1);

    const start = () => {
        setShow(false);
        setCurIndex(0);
    }

    const cancel = () => {
        setShow(true);
    }

    const getTime = time => {
        setSecCount(time);
    }

    const renderModalContent = () => {
        const minutes = secCount / 60;
        const wpm = typedWords / minutes
        return testPassed ? //secCount > 1 && typedWords > 1 ?
            <div className="intro_text">{`Words Per Minute is ${wpm.toFixed(2)}`}</div> :
            <div className="intro_text">How many WPM (Words Per Minute) could you type ?</div>
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
      <TypeManager cancel={cancel} cancelTimer={show} getTime={getTime}/>
        <Modal show={show} start={start}>
            {/*<div className="intro_text">Start typing to check your word-minute score</div>*/}
            {renderModalContent()}
        </Modal>
    </div>
  );
}

export default App;
