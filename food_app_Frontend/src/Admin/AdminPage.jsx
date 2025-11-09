import AdminLayout from "./Layouts"
import { Dashboard } from "./Pages/Dashboard"

export function AdminPage() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  )
}
