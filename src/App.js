import { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';

function App() {

  const [theme, setTheme] = useState("light");
  const [actionlogs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(true);
  const [btnNum, setBtnNum] = useState(1);

  const themeToggle = () => {
    theme === "light"? setTheme("dark"): setTheme("light");
    const themeString = theme === "light"? "Dark": "Light";
    recordLogs("message", moment().format('M/D/Y, H:mm:ss')+" Theme was set to "+themeString);
  }

  const textareaInput = (e) => {
    setMessage(e.target.value);
  }

  const handleSendMessage = () => {
    setMessage("");
    recordLogs("message", "Message Sent: "+message);
  }

  const addButton = () => {
    setBtnNum(btnNum+1);
    recordLogs("button", "Button "+btnNum+" added");
  }

  const addedBtnClick = (i) => {
    recordLogs("button", "Button "+i+" clicked");
  }

  const recordLogs = (type, text) => {
    let newLogs = actionlogs;
    newLogs.push({type: type,text: text});
    setMessage("");
    setLogs([...newLogs]);
  }

  useEffect(() => {
    if (message !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [message]);

  const buttons = []

  for (let i = 1; i< btnNum; i++) {
    buttons.push(<button key={i} className='btn new' onClick={e => addedBtnClick(i)}>Button {i}</button>)
  }

  const className = "app "+theme;

  return (
    <div className={className}>
      <div className='left-panel'>
        <button className='btn' onClick={themeToggle}>{theme==="light"? "Set Dark Theme": "Set Light Theme"}</button>
        <div className='container message'>
          <textarea className='text' onChange={textareaInput} value={message}></textarea>
          <button className='btn' disabled={disable} onClick={handleSendMessage}>Message Send</button>
        </div>
        <button className='btn' onClick={addButton}>Add Button {btnNum}</button>
        <div className='container'>
          {buttons}
        </div>
      </div>
      <div className='right-panel'>
        {actionlogs?.map((log, index) => {
          return <p key={index} className='text'>{log.text}</p>
        })}
      </div>
    </div>
  );
}

export default App;
