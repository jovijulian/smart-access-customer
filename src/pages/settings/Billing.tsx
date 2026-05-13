import { useNavigate } from 'react-router-dom';
import { SettingsLayout } from '../../components/layout/SettingsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { CreditCard, ArrowUpRight, Download, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function Billing() {
  const navigate = useNavigate();
  const invoices = [
    { id: 'INV-2026-001', date: 'May 01, 2026', amount: '$450.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Apr 01, 2026', amount: '$450.00', status: 'Paid' },
    { id: 'INV-2026-003', date: 'Mar 01, 2026', amount: '$420.00', status: 'Paid' },
  ];

  return (
    <SettingsLayout>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
        <PageHeader
          title="Billing & Finance"
          description="Manage your subscription plans, payment methods, and invoice history."
          onBack={() => navigate(-1)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Invoice History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((inv, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surfaceHover border border-border group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-background border border-border text-textSecondary">
                        <Download className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{inv.id}</p>
                        <p className="text-xs text-textSecondary">{inv.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{inv.amount}</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{inv.status}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-textSecondary hover:text-white">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-2xl font-black text-white uppercase tracking-tight">Enterprise</p>
                <p className="text-xs text-textSecondary mt-1">Next renewal: June 01, 2026</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary">Monthly Cost</span>
                  <span className="text-white font-bold">$450.00</span>
                </div>
                <div className="w-full h-px bg-border" />
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary">Payment Method</span>
                  <span className="text-white font-bold">Visa •••• 4242</span>
                </div>
              </div>

              <Button className="w-full mt-4">Upgrade Plan</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SettingsLayout>
  );
}
