import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyGroupsGrid from './MyGroupsGrid';
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import CreateAGroup from './CreateAGroup';
// import SearchGroup from "./SearchGroup";
import ScheduleSS from './ScheduleSS';
import './App.css';
import ViewGroup from "./ViewGroup";
import ProfilePage from "./profile";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={ <MyGroupsGrid />} />
          <Route exact path="/mygroups" element={ <MyGroupsGrid />} />
          <Route exact path="/signup" element={ <SignUp />} />
          <Route exact path="/login" element={ <LoginPage />} />
          <Route exact path="/profile" element={ <ProfilePage />} />
          <Route exact path="/createagroup" element={ <CreateAGroup />} />
          <Route exact path="/group1" element={ <ViewGroup />} />
          {/* <Route exact path="/searchgroup" element={ <SearchGroup />} /> */}
          <Route exact path="/studysession" element={ <ScheduleSS />} />
        </Routes>
    </div>
  );
}

export default App;
