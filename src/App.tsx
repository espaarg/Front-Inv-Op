import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Header/>
        <AppRoutes/>
      <Footer/>
    </Router>
    </>
  )
}

export default App
