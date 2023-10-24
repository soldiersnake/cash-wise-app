const Nav = () => {
    return (
        <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <a className="nav-link" href="index.html">
                <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
            </a>
            <div className="sb-sidenav-menu-heading">Addons</div>
            <a className="nav-link" href="charts.html">
                <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                </div>
                Charts
            </a>
            <a className="nav-link" href="tables.html">
                <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                </div>
                Historial
            </a>
            <div className="sb-sidenav-menu-heading">Nosotros</div>
            <a className="nav-link" href="charts.html">
                <div className="sb-nav-link-icon">
                    <i className="fa-solid fa-star fa-flip"></i>
                </div>
                Premium
            </a>
            <a className="nav-link" href="charts.html">
                <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                </div>
                ¿Quienes Somos?
            </a>
            <a className="nav-link" href="tables.html">
                <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                </div>
                Contacto
            </a>
        </div>
    );
};

export default Nav;
