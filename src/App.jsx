import { Provider } from 'react-redux'
import { AppHeader } from './cmps/AddHeader'
import { ToysIndex } from './pages/ToysIndex'
import { store } from './store/store'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ToyEdit } from './pages/ToyEdit';
import { ToyDetail } from './pages/ToyDetail';

function App() {


  return (
    <>
    <Provider store={store}>
      <Router>

    <header><AppHeader/></header>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/toys' element={<ToysIndex />} />
      <Route path='/toys/edit' element={<ToyEdit />} />
      <Route path='/toys/edit/:toyId?' element={<ToyEdit />} />
      <Route path='/toys/:toyId?' element={<ToyDetail/> } />
    </Routes>
    {/* <ToysIndex /> */}
      </Router>
    </Provider>
    </>
  )
}

export default App
