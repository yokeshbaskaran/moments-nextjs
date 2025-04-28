"use client";

import { logout } from "@/app/actions/auth";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { MdLockPerson } from "react-icons/md";

const Navbar = () => {
  const { user, setUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = user
    ? [
        { label: "Home", icon: <IoHomeOutline size={25} />, link: "/" },
        // { label: "Profile", link: "/myprofile" },
        // { label: "Search", link: "/search" },
        // { label: "Notifications", link: "/notifications" },
        // { label: "Create Post", link: "/create" },
      ]
    : [
        { label: "Home", icon: <IoHomeOutline size={25} />, link: "/" },
        {
          label: "Login/Signup",
          icon: <MdLockPerson size={25} />,
          link: "/authpage",
        },
      ];

  const handleLogout = () => {
    startTransition(async () => {
      const { errorMessage } = await logout();
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        setUser(null);
        router.push("/authpage");
        toast.success("User logged out");
      }
    });
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // close mobile menu after click
  };

  return (
    <>
      {/* Black backdrop when sidebar open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Desktop Navbar */}
      <header className="hidden md:flex items-center justify-between px-4 py-2 border-b border-gray-300 bg-white z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <h2 className="text-2xl font-semibold text-app">Moments</h2>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-6">
            {navLinks.map((item, idx) => {
              const isActive = pathname === item.link;
              return (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className={`text-lg font-medium ${
                      isActive ? "text-appColor" : "hover:text-appColor"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {user && (
              <>
                <div className="flex flex-col">
                  <span className="text-lg font-medium capitalize">
                    Hi,{user.user_metadata?.username || "User"}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="flex items-center gap-2 bg-red-700 text-white px-3 py-2 rounded-lg hover:scale-105 transition cursor-pointer"
                >
                  <span>Logout</span>
                </button>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* Mobile Topbar */}
      <header className="md:hidden fixed top-0 left-0 w-full px-2 py-3 flex justify-between select-none z-50 shadow-md backdrop-blur-lg bg-white/10 border-b border-white/20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <h2 className="text-2xl font-semibold text-app">Moments</h2>
        </Link>

        {/* Hamburger Icon */}
        {!isMobileMenuOpen ? (
          <CiMenuFries
            color="black"
            size={28}
            className="cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl text-black"
          >
            <IoCloseSharp color="black" size={28} className="cursor-pointer" />
          </button>
        )}
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <aside className="fixed md:hidden top-0 left-0 w-[220px] h-full bg-white shadow-lg z-50 flex flex-col px-4 py-4">
          <div className="flex items-center gap-2 mb-8">
            <Image src="/logo.png" alt="logo" width={30} height={30} />
            <h2 className="text-2xl font-semibold text-app">Moments</h2>
          </div>

          <ul className="flex flex-col gap-6">
            {navLinks.map((item, idx) => {
              const isActive = pathname === item.link;
              return (
                <li key={idx}>
                  <Link
                    href={item.link}
                    onClick={handleLinkClick}
                    className={`flex gap-2 text-lg ${
                      isActive ? "text-appColor" : "hover:text-appColor"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Logout Button */}

            {user && (
              <>
                <div className="flex items-center gap-2">
                  <RxAvatar size={25} />
                  <span className="text-lg font-medium capitalize">
                    Hi, {user.user_metadata?.username || "User"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full flex justify-center items-center gap-2 bg-red-700 text-white px-3 py-2 rounded-lg hover:scale-105 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Navbar;
