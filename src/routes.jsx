import HomePage from "./pages/HomePage.jsx";
import KoleksiPage from "./pages/KoleksiPage.jsx";
import ProsesPage from "./pages/ProsesPage.jsx";
import AdminPage from "./admin/AdminPage.jsx";

// Tambah halaman baru cukup dengan menambah satu baris di sini.
// nav: true = tampil di navbar.
export const ROUTES = [
  { path: "/", label: "Home", Component: HomePage, nav: true },
  { path: "/koleksi", label: "Koleksi", Component: KoleksiPage, nav: true },
  { path: "/proses", label: "Proses Jahit", Component: ProsesPage, nav: true },
  { path: "/admin", label: "Admin", Component: AdminPage, nav: false }, // panel CMS (#/admin)
];

// Rute tidak dikenal kembali ke beranda.
export const resolveRoute = (path) => ROUTES.find((r) => r.path === path) || ROUTES[0];
