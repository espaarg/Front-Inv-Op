import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-bootstrap'

function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Header/>
        <AppRoutes/>
      <Footer/>
    </Router>
    </>
  )
}

export default App
