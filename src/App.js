import React from 'react';
import TopBar from './components/TopBar';
import RequestFile from './components/RequestFile';
import AuditReport from './components/AuditReport';
import './App.css';

function App() {
  let [button, setButton] = React.useState(false);
  if(!button){
    return(
      <div>
        <TopBar />
        Audit this File:
        <RequestFile setButton={setButton}/>
        <AuditReport/>
      </div>
    )
  }
  else{
    return (
      <div>
        <TopBar />
        <AuditReport/>
        Audit Another file:
        <button onClick={()=>setButton(false)}>Click to go back</button>
      </div>
    );
  }
}

export default App;
