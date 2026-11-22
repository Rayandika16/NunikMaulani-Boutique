import { useContent } from "./context/ContentContext.jsx";
import { useRoute } from "./hooks/useRoute.js";
import { resolveRoute } from "./routes.jsx";
import { C, sans } from "./config/site.js";
import BatikPattern from "./components/ui/BatikPattern.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import FloatingWA from "./components/layout/FloatingWA.jsx";
import PageTransition from "./components/layout/PageTransition.jsx";

// Kerangka situs: latar, navbar, halaman aktif (dengan transisi), footer.
export default function App() {
  const route = resolveRoute(useRoute());
  const { Component } = route;
  const { ready } = useContent();
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ color: C.ink, ...sans }}>
      <BatikPattern />
      <Navbar route={route.path} />
      <main>
        {ready ? (
          <PageTransition routeKey={route.path}>
            <Component />
          </PageTransition>
        ) : (
          <p className="py-40 text-center text-sm opacity-60">Memuat…</p>
        )}
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
