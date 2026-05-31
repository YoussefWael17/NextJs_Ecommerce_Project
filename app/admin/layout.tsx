"use client";

import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faXmark, faChartLine, faUsers, faCartShopping, faBoxOpen, faGear, faTableColumns, faBell } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-[#DB4444] transition-all duration-200";

  const sections = [
    {
      title: "Dashboard",
      links: [
        {
          href: "/admin",
          label: "Overview",
          icon: faTableColumns,
        },
        {
          href: "/admin/analytics",
          label: "Analytics",
          icon: faChartLine,
        },
      ],
    },

    {
      title: "Management",
      links: [
        {
          href: "/admin/users",
          label: "Users",
          icon: faUsers,
        },
        {
          href: "/admin/orders",
          label: "Orders",
          icon: faCartShopping,
        },
        {
          href: "/admin/products",
          label: "Products",
          icon: faBoxOpen,
        },
      ],
    },

    {
      title: "Settings",
      links: [
        {
          href: "/admin/settings",
          label: "Settings",
          icon: faGear,
        },
      ],
    },
  ];

  // const isActive = (href: string) => {
  //   return pathname === href || pathname.startsWith(href + "/");
  // };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-300 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 py-4">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <h1 className="text-2xl font-bold text-black">
              Cartify Dashboard
            </h1>

          </div>

          <div className="flex items-center gap-3">

            {/* Notification Button */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[#DB4444] hover:text-[#DB4444]">

                <FontAwesomeIcon icon={faBell} />

                {/* Notification Count */}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DB4444] text-[10px] font-bold text-white">
                3
                </span>

            </button>

            {/* Admin Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DB4444] bg-[#DB4444] text-sm font-bold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444]">
                A
            </div>

        </div>


        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-999 lg:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar */}
          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] overflow-y-auto bg-white p-5 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-[#DB4444]">
                Admin Panel
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-xl"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-8">

                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                  {section.title}
                </h3>

                <nav className="flex flex-col gap-2">

                  {section.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`${linkClass} ${
                        isActive(link.href)
                          ? "bg-red-50 text-[#DB4444] font-semibold"
                          : ""
                      }`}
                    >

                      <FontAwesomeIcon icon={link.icon} />

                      {link.label}

                    </Link>
                  ))}

                </nav>

              </div>
            ))}

          </aside>

        </div>
      )}

      {/* Main Layout */}
      <div className="mx-auto flex max-w-7xl">

        {/* Desktop Sidebar */}
        <aside className="hidden min-h-screen w-70 border-r border-gray-300 bg-white p-6 lg:block">

          <div className="sticky top-24">

            <h2 className="mb-10 text-2xl font-bold text-black">
              Admin Panel
            </h2>

            {sections.map((section, index) => (
              <div key={index} className="mb-8">

                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                  {section.title}
                </h3>

                <nav className="flex flex-col gap-2">

                  {section.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className={`${linkClass} ${
                        isActive(link.href)
                          ? "bg-red-50 text-[#DB4444] font-semibold"
                          : ""
                      }`}
                    >

                      <FontAwesomeIcon icon={link.icon} />

                      {link.label}

                    </Link>
                  ))}

                </nav>

              </div>
            ))}

          </div>

        </aside>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}