import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import MarketPage from "../pages/MarketPage";
import TradePage from "../pages/TradePage";
const AppRoutes = () =>{
  return(
    <Routes>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>

      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/market" element={<MarketPage/>}></Route>
      <Route path="/trade" element={<TradePage/>}></Route>
    </Routes>
  )
}

export default AppRoutes