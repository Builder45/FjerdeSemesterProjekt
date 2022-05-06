import Loading from "../components/ui/Loading";

function AdminPage() {
  return (
    <p>Secret admin page!</p>
  )
}

AdminPage.authOptions = {
  role: "Admin",
  loading: <Loading />
};
export default AdminPage;