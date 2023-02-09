import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import bookmark from "../assets/icons/icon-nav-bookmark.svg";
import home from "../assets/icons/icon-nav-home.svg";
import movies from "../assets/icons/icon-nav-movies.svg";
import series from "../assets/icons/icon-nav-tv-series.svg";
import profil from "../assets/icons/image-avatar.png";
import logo from "../assets/icons/logo.svg";
import Modal from "../components/Modal";

const Navbar = ({ setSessionStatus }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const user = useSelector((store) => store.reducerUser);

  const activeStyle = {
    filter: "invert(80%) sepia(100%) saturate(100%) hue-rotate(155deg) brightness(166%) contrast(100%)",
  };
  const dispatch = useDispatch();

  const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_ANON_API_KEY
  );
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    setSessionStatus("SIGNED_OUT");
  }

  useEffect(() => {
    async function getUserData() {
      async function getProfile(id) {
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url,id,bookmarks `)
          .eq("id", id)
          .single();
        dispatch({ type: "INIT_USER", payload: data });
      }
      await supabase.auth.getUser().then((value) => {
        getProfile(value.data.user.id);
      });
    }
    getUserData();
  }, []);

  return (
    <section className="navbar" onMouseLeave={() => {setCartIsOpen(false)}}>
      <nav className="navbar-container nav-container">
        <img src={logo} alt="" className="navbar-logo" />
        <div className="navbar-links">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
          >
            <img src={home} alt="Go to Home Page" />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/movies"
          >
            <img src={movies} alt="Go to Movies Page" />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/series"
          >
            <img src={series} alt="Go to Series Page" />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/bookmark"
          >
            <img src={bookmark} alt="Go to your Favorites" />
          </NavLink>
        </div>
        <ul>
          <li>
            <button onClick={() => setCartIsOpen(!cartIsOpen)} onMouseEnter={() => setCartIsOpen(true)}>
              <img src={`https://tkegivgfbmgphxcmaomd.supabase.co/storage/v1/object/public/avatars/${user.id}/${user?.avatar_url}`} alt="No pfp" className="navbar-profil" />
            </button>
          </li>
          <li style={{position:"relative"}}>
            {cartIsOpen && <Modal setSessionStatus={setSessionStatus} user={user} />}
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
