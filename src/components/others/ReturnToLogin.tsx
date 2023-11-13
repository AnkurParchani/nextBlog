"use client";

import { useRouter } from "next/navigation";

const ReturnToLogin = () => {
  const router = useRouter();
  router.push("/login");
  return null;
};

export default ReturnToLogin;
