import { Outlet } from 'react-router-dom'

import Header from './components/header/header'
import SearchBar from './components/search_bar/search_bar'
import Footer from './components/footer/footer'
import BtnPages from './components/paginas/pages'

function App() {

  return (
    <>
      <Header />

      <SearchBar />
      
      <Outlet />
      
      <BtnPages />
      
      <Footer />
    </>
  )
}

export default App

