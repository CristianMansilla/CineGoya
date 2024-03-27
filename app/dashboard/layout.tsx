import SideNav from "../ui/dashboard/sidenav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64"><SideNav></SideNav></div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </div>
            <footer className="py-10 flex justify-center items-center">
                <p>Hecho con 💙 por CRISTIAN</p>
            </footer>
        </>
    )
}

export default Layout;
