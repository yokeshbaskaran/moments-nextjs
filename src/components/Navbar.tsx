"use client";

import { logout } from "@/app/actions/auth";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const navLinks = [
    { label: "home", link: "/" },
    { label: "Login/Signup", link: "/authpage" },
  ];

  const { user, setUser } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    const { errorMessage } = await logout();

    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      setUser(null);
      router.push("/");
      toast.error("User logged out");
    }
  };

  return (
    <header className="p-2 flex space-x-3 border-b border-gray-300">
      <h2>Moments</h2>

      <nav className="ml-auto">
        <ul className="flex space-x-3">
          {user?.user_metadata ? (
            <>
              <span className="capitalize">{user.user_metadata.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {navLinks.map((nav, idx) => (
                <Link href={nav.link} key={idx}>
                  <li>{nav.label}</li>
                </Link>
              ))}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
