import { Provider } from 'react-redux'
import { AppHeader } from './cmps/AddHeader'
import { ToysIndex } from './pages/ToysIndex'
import { store } from './store/store'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ToyEdit } from './pages/ToyEdit';
import { ToyDetail } from './pages/ToyDetail';
import { AppFooter } from './cmps/AppFooter';
import { DynamicModal } from './cmps/DynamicModal';
import { UserMsg } from './cmps/UserMsg';
import { UserDetails } from './pages/UserDetails';

function App() {


  return (
    <>
      <Router>
    <Provider store={store}>

    <header className="full main-layout"><AppHeader/></header>
    <main>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/afik-miss-toy-proj/home' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/toys' element={<ToysIndex />} />
      <Route path='/toys/edit' element={<ToyEdit />} />
      <Route path='/toys/edit/:toyId?' element={<ToyEdit />} />
      <Route path='/toys/:toyId?' element={<ToyDetail/> } />
      <Route path='/toys/user/:userId?' element={<UserDetails /> } />
    </Routes>
    </main>
      <footer className="full"> 
        <AppFooter />
      </footer>
      <UserMsg />
      <DynamicModal />
    </Provider>
      </Router>
    </>
  )
}

export default App
