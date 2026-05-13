import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerMobileLayout } from '@/components/layout/CustomerLayout';
import { Login } from './pages/auth/login';
import { OTPVerification } from './pages/auth/verify-otp';
import { ResidentDetail } from './pages/resident/[id]';
import { Home } from './pages/home';
import { Guest } from './pages/guest';
import { CreateGuest } from './pages/guest/create';
import { Log } from './pages/log';
import { Profile } from './pages/profile';
import { Billing } from './pages/billing';
import { GuestDetail } from './pages/guest/[id]';
import { NotificationList } from './pages/notification';
import { NotificationDetail } from './pages/notification/[id]';

function App() {
  return (
    <BrowserRouter>
      <div className="h-[100dvh] bg-black flex justify-center font-sans overflow-hidden">
        <div className="w-full bg-background relative shadow-2xl overflow-hidden flex flex-col h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/guest/create" element={<CreateGuest />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/guest/:id" element={<GuestDetail />} />
            <Route path="/notification" element={<NotificationList />} />
            <Route path="/notification/:id" element={<NotificationDetail />} />
            <Route element={<CustomerMobileLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/guest" element={<Guest />} />
              <Route path="/log" element={<Log />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/resident/:id" element={<ResidentDetail />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;