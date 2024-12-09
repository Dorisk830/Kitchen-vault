import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false); // State to manage sidebar visibility

  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpenSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet /> {/* This renders the child routes */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
