import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyGroupsGrid from './MyGroupsGrid';
import CreateAGroup from './CreateAGroup';
import ScheduleSS from './ScheduleSS';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <MyGroupsGrid />} />
          <Route path="/mygroups" element={ <MyGroupsGrid />} />
          <Route path="/createagroup" element={ <CreateAGroup />} />
          <Route path="/studysession" element={ <ScheduleSS />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
