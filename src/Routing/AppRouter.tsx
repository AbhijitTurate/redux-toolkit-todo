import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";


type RouterProps = {
    children: React.ReactNode; // 👈️ define children prop
};
const AppRouter = (props: RouterProps) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} >
                
                </Route>
                <Route path="/todoapp" element={<App />} />
            </Routes>
        </BrowserRouter>)
}

export default AppRouter;