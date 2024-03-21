import { Route, Routes } from "react-router-dom";
import MyGroupsGrid from './MyGroupsGrid';
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import CreateAGroup from './CreateAGroup';
import SearchGroup from "./SearchGroup";
import ScheduleSS from './ScheduleSS';
import './App.css';
import ViewGroup from "./ViewGroup";
import ProfilePage from "./profile";
import Home from './Home';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="StudyFusion/" element={ <Home />} />
          <Route exact path="StudyFusion/mygroups" element={ <MyGroupsGrid />} />
          <Route exact path="StudyFusion/signup" element={ <SignUp />} />
          <Route exact path="StudyFusion/login" element={ <LoginPage />} />
          <Route exact path="StudyFusion/profile" element={ <ProfilePage />} />
          <Route exact path="StudyFusion/createagroup" element={ <CreateAGroup />} />
          <Route exact path="StudyFusion/viewgroup" element={ <ViewGroup />} />
          <Route exact path="StudyFusion/searchgroup" element={ <SearchGroup />} />
          <Route exact path="StudyFusion/studysession" element={ <ScheduleSS />} />
        </Routes>
    </div>
  );
}

export default App;
