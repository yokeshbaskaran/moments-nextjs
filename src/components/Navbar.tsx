// /components/Navbar.tsx
"use client";

import { logout } from "@/app/actions/auth";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navLinks = [
    { label: "home", link: "/" },
    { label: "Login/Signup", link: "/authpage" },
  ];

  const { user, setUser } = useAppContext();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const { errorMessage } = await logout();

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        setUser(null); // technically optional now, since auth listener does it
        router.push("/");
        toast.success("User logged out");
      }
    });
  };

  return (
    <header className="px-3 py-4 flex space-x-3 border-b border-gray-300">
      <h2>
        <Link href="/">Moments</Link>
      </h2>
      <nav className="ml-auto">
        <ul className="flex space-x-3">
          {user ? (
            <>
              <span className="capitalize">{user.user_metadata?.email}</span>
              <button
                className="cursor-pointer text-red-400"
                disabled={isPending}
                onClick={handleLogout}
              >
                Logout
              </button>
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
