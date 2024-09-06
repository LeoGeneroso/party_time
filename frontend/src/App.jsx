import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <Outlet />
        </>
    )
}

export default App
