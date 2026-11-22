import { useEffect, useState } from "react";

// Router hash sederhana: "#/koleksi" -> "/koleksi". Aman untuk hosting statis.
const read = () => window.location.hash.replace(/^#/, "") || "/";

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
