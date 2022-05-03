import MainNavbar from './MainNavbar';

function Layout(props) {
  return (
    <>
      <MainNavbar />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;