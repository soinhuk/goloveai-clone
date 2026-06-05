import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Chat from './pages/Chat'
import Create from './pages/Create'
import Characters from './pages/Characters'
import Chats from './pages/Chats'
import Search from './pages/Search'
import Premium from './pages/Premium'
import Generate from './pages/Generate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="app/explore" element={<Explore />} />
          <Route path="app/characters" element={<Characters />} />
          <Route path="app/chats" element={<Chats />} />
          <Route path="app/search" element={<Search />} />
          <Route path="app/premium" element={<Premium />} />
          <Route path="create" element={<Create />} />
          <Route path="generate" element={<Generate />} />
          <Route path="chat/:username" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App