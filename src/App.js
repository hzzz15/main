import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ResultLastPage from './pages/ResultLastPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage'
import LivePage from './pages/LivePage';
import LikePage from './pages/LikePage';
import ReservationPage from './pages/ReservationPage';
import LastPage from './pages/LastPage';

import Reservation1Page from './pages/Reservation1Page';
import Reservation2Page from './pages/Reservation2Page';
import SignupPage from './pages/SignupPage';
import Signup2Page from './pages/Signup2Page';
import ReviewPage from './pages/ReviewPage'
import TemporaryCarePage from './pages/TemporaryCarePage'
import TemporaryCare_RePage from './pages/TemporaryCare_RePage'
import Temporary_choicePage from './pages/Temporary_choicePage'
import WalkPage from './pages/WalkPage'
import Walk2Page from './pages/Walk2Page'
import LiveResertPage from './pages/LiveResertPage';
import DogInformationPage from './pages/DogInformationPage';
import MyProfilePage from './pages/MyProfilePage';
import DbtiPage from './pages/DbtiPage';



function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/ResultLastPage" element={<ResultLastPage/>} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
        <Route path="/LoginPage" element={<LoginPage/>} />
        <Route path="/LivePage" element={<LivePage/>} />
        <Route path="/LikePage" element={<LikePage/>} />
        <Route path="/ReservationPage" element={<ReservationPage/>} />
        <Route path="/LastPage" element={<LastPage/>} />

        <Route path="/Reservation1Page" element={<Reservation1Page/>} />
        <Route path="/Reservation2Page" element={<Reservation2Page/>} />
        <Route path="/SignupPage" element={<SignupPage/>} />
        <Route path="/Signup2Page" element={<Signup2Page/>} />
        <Route path="/ReviewPage" element={<ReviewPage/>} />
        <Route path="/TemporaryCarePage" element={<TemporaryCarePage/>} />
        <Route path="/TemporaryCare_RePage" element={<TemporaryCare_RePage/>} />
        <Route path="/Temporary_choicePage" element={<Temporary_choicePage/>} />
        <Route path="/WalkPage" element={<WalkPage/>} />
        <Route path="/Walk2Page" element={<Walk2Page/>} />
        <Route path="/LiveResertPage" element={<LiveResertPage/>} />
        <Route path="/DogInformationPage" element={<DogInformationPage/>} />
        <Route path="/MyProfilePage" element={<MyProfilePage/>} />
        <Route path="/DbtiPage" element={<DbtiPage/>} />


      </Routes>
    
  );
}

export default App;
