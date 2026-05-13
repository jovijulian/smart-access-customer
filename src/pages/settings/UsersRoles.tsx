import { useNavigate } from 'react-router-dom';
import { SettingsLayout } from '../../components/layout/SettingsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Plus, Search } from 'lucide-react';

export function UsersRoles() {
  const navigate = useNavigate();
  const users = [
    { name: 'Admin User', email: 'admin@smartaccess.com', role: 'Super Admin', status: 'Active' },
    { name: 'John Doe', email: 'john@example.com', role: 'Site Manager', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Security Guard', status: 'Inactive' },
  ];

  return (
    <SettingsLayout>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
        <PageHeader
          title="User & Roles"
          description="Manage system administrators and their access permissions across modules."
          onBack={() => navigate(-1)}
          actions={
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Invite New User</span>
            </Button>
          }
        />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Platform Access Control
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
              <input type="text" placeholder="Search users..." className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-textSecondary">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-surfaceHover border border-border text-textSecondary">
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-textSecondary">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage Access</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
}
