import { BrowserRouter, Routes } from "react-router-dom"
import { Route } from "react-router-dom";
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { Toaster } from '../src/components/ui/toaster'


function App() {
  

  return (
    <>
    <Toaster/>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
