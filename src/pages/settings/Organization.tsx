import { useNavigate } from 'react-router-dom';
import { SettingsLayout } from '../../components/layout/SettingsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { Building2 } from 'lucide-react';

export function Organization() {
  const navigate = useNavigate();
  return (
    <SettingsLayout>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
        <PageHeader
          title="Organization Settings"
          description="Manage your company profile, branding, and global configuration."
          onBack={() => navigate(-1)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Company Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-textSecondary uppercase">Organization Name</label>
                  <input type="text" defaultValue="Smart Access Corp" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-textSecondary uppercase">Tax ID / NPWP</label>
                  <input type="text" defaultValue="12.345.678.9-012.000" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-textSecondary uppercase">Headquarters Address</label>
                <textarea className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary min-h-[100px]">Sudirman Central Business District (SCBD), Jakarta Selatan, Indonesia</textarea>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-textSecondary">Active Modules</span>
                  <span className="text-sm font-bold text-white">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-textSecondary">Total Sites</span>
                  <span className="text-sm font-bold text-white">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-textSecondary">Storage Usage</span>
                  <span className="text-sm font-bold text-white">45.2 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SettingsLayout>
  );
}
