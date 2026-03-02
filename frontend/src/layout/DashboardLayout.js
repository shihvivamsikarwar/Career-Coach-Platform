import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div style={{ flex: 1, marginLeft: "240px" }}>
        {/* Top Navbar */}
        <Topbar />

        {/* Page Content */}
        <div style={{ padding: "25px" }}>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
