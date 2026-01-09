import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./component/Dashboard/Dashboard";
import ProtectedRoute from "./component/Dashboard/ProtectedRoute";


// Pages



import SettingsPage from "./pages/Settings";




import AdminLogin from "./component/Auth/AdminLogin";
import AdminUsers from "./pages/UserDetails";
import AdminDeposits from "./pages/Deposite";
import AdminWallets from "./pages/Adminwallet";
import AdminWithdrawals from "./pages/AdminWithdrawals";
import AdminInvestments from "./pages/AdminInvestments";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
       
        <Route path="/login" element={<AdminLogin/>} /> 

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
           </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
         
          <Route path="settings" element={<SettingsPage/>} />
         <Route path="wallet" element={<AdminWallets/>}/>
         <Route path="deposite" element={<AdminDeposits/>}/>
         <Route path="details" element={<AdminUsers/>}/>
         <Route path="withdrawals" element={<AdminWithdrawals/>}/>
         <Route path="investment" element={<AdminInvestments/>}/>
          
        </Route>

        {/* Catch all → redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}
