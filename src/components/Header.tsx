import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";
import classNames from "classnames";
import Logo from "./Logo";
import { useLayoutEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import Hamburger from "hamburger-react";

const menuList = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
];

function useWindowSize(cb: () => void) {
  useLayoutEffect(() => {
    window.addEventListener("resize", cb);
    cb();
    return () => window.removeEventListener("resize", cb);
  }, []);
}

const Header = () => {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));
  useWindowSize(() => setOpen(false));

  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Logo />
          <div className="flex items-center lg:order-2">
            <Logout />
            <div ref={ref} className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
            </div>
          </div>
          <div
            className={classNames({
              "fixed left-0 shadow-4xl right-0 top-20 p-5 pt-0 bg-neutral-950 border-b border-b-white/20":
                isOpen,
              "hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1":
                !isOpen,
            })}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menuList.map((menu) => {
                const isActive = menu.path === location.pathname;
                return (
                  <li key={menu.path}>
                    <Link
                      to={menu.path}
                      className={classNames({
                        "block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0":
                          isActive,
                        "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700":
                          !isActive,
                      })}
                    >
                      {menu.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
