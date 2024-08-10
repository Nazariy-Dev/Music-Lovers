import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <Container>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a onClick={() => window.location.href = "#about"}>About Us</a></li>
                            <li><a onClick={() => window.location.href = "#howToUse"}>How to use</a></li>
                        </ul>
                    </div>
                    <a className={`bg-neutural btn btn-ghost text-2xl `}>
                        {/* <img src={Logo} alt="" /> */}
                        <FontAwesomeIcon icon={faWaveSquare} />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a onClick={() => window.location.href = "#about"}>About Us</a></li>
                        <li><a onClick={() => window.location.href = "#howToUse"}>How to use</a></li>
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    <Link to={"/login"} className="btn btn-primary btn-sm">Log In</Link>
                    <Link to={'/register'} className="btn btn-primary btn-sm">Sign Up</Link>
                </div>
            </div>
        </Container>
    )
}
