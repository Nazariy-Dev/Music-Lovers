import Container from "./Container";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { checkAuth, logout } from "../store/reducers/ActionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
// import { musicLoversAPI } from "../store/api/musicLoversAPI";
import { Link, useNavigate } from "react-router-dom";


export default function Header() {

    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.userReducer)

    return (
        <Container>
            <div className="navbar bg-base-100">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-200">
                            <li><Link to={"/"}>Feed</Link></li>
                            <li><Link to={"likedSongs"}>Liked songs</Link></li>
                            <li><Link to={"findMore"}>Discover Songs</Link></li>
                        </ul>
                    </div>
                    <a className={`bg-neutural btn btn-ghost text-2xl `}>
                        {/* <img src={Logo} alt="" /> */}
                        <FontAwesomeIcon icon={faWaveSquare} />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={"/"}>Feed</Link></li>
                        <li><Link to={"likedSongs"}>Liked songs</Link></li>
                        <li><Link to={"findMore"}>Discover Songs</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                            <div className="w-10 rounded-full relative bg-secondary flex items-center justify-center">
                                {user.name && <div className="text-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">{user?.name[0]}</div>}
                            </div>
                        </div>
                        <ul tabIndex={0} className=" menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Hello, {user?.name}
                                </a>
                            </li>

                            {/* {!isAuth && <li><Link to={'/login'}>Login</Link></li>} */}
                            <li><Link to={"addSong"}>Add a song</Link></li>
                            <li onClick={() => dispatch(logout())}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Container >
    )
}


