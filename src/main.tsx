import ReactDOM from 'react-dom/client'
import './index.css'
import { setupStore } from './store/store.ts'
import { Provider } from 'react-redux'

const store = setupStore()

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom';
import Header from './components/Header.tsx'
import Feed from './pages/Feed/Feed.tsx'
import Login from './pages/Auth/Login.tsx'
import Register from './pages/Auth/Register.tsx'
import AddSong from './pages/AddSong/AddSong.tsx'
import Filters from './components/Filters.tsx'
import LikedSongs from './pages/LikedSongs/LikedSongs.tsx'
import FindMore from './pages/FindMore/FindMore.tsx'
import ProtectedRoutes from './utils/components/ProtectedRoutes.tsx'
import Landing from './pages/Landing/Landing.tsx'

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<Root />}>
          <Route index element={<Feed />} />
          <Route path='addSong' element={<AddSong />} />
          <Route path='filters/:sectionName' loader={loader} element={<Filters />} />
          <Route path='likedSongs' element={<LikedSongs />} />
          <Route path='findMore' element={<FindMore />} />
        </Route>
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='landing' element={<Landing/>} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

function loader({ params }: any) {
  const { sectionName } = params

  let pathname = ""
  switch (sectionName) {
    case "feed":
      pathname = "/";
      break
    case "likedSongs":
      pathname = "/likedSongs"
      break
    case "findMore":
      pathname = "/findMore"
      break
  }
  return pathname
}
