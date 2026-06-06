"use client";

import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  roles: string[];
};

export default function ProtectedRoute({ children, roles } : Props) {
  const auth = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth || auth.loading) return;

    if (!auth.user) {
      router.replace("/sign-in");
      return;
    }

    if (!roles.includes(auth.user.role)) {
      router.replace("/");
    }
  }, [auth, router, roles]);

  if (!auth || auth.loading) {
    return ;
  }

  if (!auth.user) {
    return null;
  }

  // useEffect(() => {
  //   if (!auth?.user) {
  //     router.replace("/sign-in");
  //     return;
  //   }

  //   if (!roles.includes(auth.user.role)) {
  //     router.replace("/");
  //   }
  // }, [auth?.user]);

  // if (!auth?.user) return null;

  // console.log(auth?.user);

  return <>{children}</>;
}