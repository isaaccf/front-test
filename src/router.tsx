import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Details from "./pages/details";

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}