import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import PostView from './pages/PostView';
import PostWrite from './pages/PostWrite';
import Search from './pages/Search';
import MainHeader from './components/MainHeader';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* 메인 헤더 */}
        <MainHeader />

        {/* 라우팅 */}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/post/:id' element={<PostView />} />
          <Route path='/post/write' element={<PostWrite />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
