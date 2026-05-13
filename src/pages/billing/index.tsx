import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Receipt, CalendarDays, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderBack } from '@/components/layout/HeaderBack';

interface Bill {
    id: string;
    title: string;
    period: string; 
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Unpaid' | 'Overdue';
}

export function Billing() {
    const navigate = useNavigate();
    const [periodFilter, setPeriodFilter] = useState('2026');
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const latestBill = {
        title: 'May 2026',
        dueDate: '10 May 2026',
        amount: 1500000,
        status: 'Paid'
    };

    const billingHistory: Bill[] = [
        { id: 'INV-041', title: 'April 2026', period: 'April 2026', dueDate: '10 Apr 2026', amount: 1500000, status: 'Paid' },

        { id: 'INV-031', title: 'March 2026', period: 'March 2026', dueDate: '10 Mar 2026', amount: 1500000, status: 'Paid' },

        { id: 'INV-021', title: 'February 2026', period: 'February 2026', dueDate: '10 Feb 2026', amount: 1500000, status: 'Overdue' },
    ];

    const groupedHistory = billingHistory.reduce((acc, bill) => {
        if (!bill.period.includes(periodFilter) && periodFilter !== 'All') return acc;

        if (!acc[bill.period]) acc[bill.period] = [];
        acc[bill.period].push(bill);
        return acc;
    }, {} as Record<string, Bill[]>);

    return (
        <div className="flex-1 flex flex-col bg-black h-full">
            <div className="w-full max-w-md mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-2xl overflow-hidden">
                <HeaderBack title="Billing Information" />

                <main className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide pb-10">
                    <section className="bg-surface border border-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-xs font-bold text-white uppercase tracking-widest">
                                Latest Billing Status
                            </h2>
                        </div>
                        <div className="bg-background border border-border rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-white mb-1">{latestBill.title}</p>
                                <p className="text-xs text-textSecondary">Due Date: {latestBill.dueDate}</p>
                            </div>

                            <div className="text-right">
                                <p className={cn(
                                    "text-xl font-bold mb-1",
                                    latestBill.status === 'Paid' ? "text-white-500" : "text-red-500"
                                )}>
                                    {latestBill.amount === 0 ? 'Rp 0' : formatRupiah(latestBill.amount)}
                                </p>
                                <p className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider",
                                    latestBill.status === 'Paid' ? "text-green-500/80" : "text-red-500/80"
                                )}>
                                    {latestBill.status}
                                </p>
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                    </section>
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Billing History</h3>

                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textSecondary" />
                                <select
                                    value={periodFilter}
                                    disabled
                                    onChange={(e) => setPeriodFilter(e.target.value)}
                                    className="bg-surface border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                                >
                                    <option value="All">All Period</option>
                                    <option value="2026">Year 2026</option>
                                    <option value="2025">Year 2025</option>
                                </select>
                            </div>
                        </div>
                        {Object.keys(groupedHistory).length > 0 ? (
                            <div className="space-y-6 mt-2">
                                {Object.entries(groupedHistory).map(([monthYear, bills]) => (
                                    <div key={monthYear} className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-surfaceHover p-1.5 rounded-lg shrink-0">
                                                <CalendarDays className="w-4 h-4 text-textSecondary" />
                                            </div>
                                            <h4 className="text-sm font-bold text-white">{monthYear}</h4>
                                            <div className="h-px bg-border flex-1"></div>
                                        </div>
                                        <div className="space-y-3 pl-2 border-l-2 border-border/50 ml-3">
                                            {bills.map((bill) => (
                                                <div
                                                    key={bill.id}
                                                    className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden"
                                                >
                                                    <div className={cn(
                                                        "absolute left-0 top-0 bottom-0 w-1",
                                                        bill.status === 'Paid' ? "bg-green-500" :
                                                            bill.status === 'Overdue' ? "bg-red-500" : "bg-yellow-500"
                                                    )}></div>

                                                    <div className="flex items-start justify-between pl-2">
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{bill.title}</p>
                                                            <p className="text-[10px] text-textSecondary mt-0.5 font-mono">{bill.id}</p>
                                                        </div>
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase border flex items-center gap-1 shrink-0",
                                                            bill.status === 'Paid' ? "text-green-500 bg-green-500/10 border-green-500/20" :
                                                                bill.status === 'Overdue' ? "text-red-500 bg-red-500/10 border-red-500/20" :
                                                                    "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                                                        )}>
                                                            {bill.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                            {bill.status}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-end justify-between pl-2 pt-2 border-t border-border/50">
                                                        <div>
                                                            <p className="text-[10px] text-textSecondary">Due Date</p>
                                                            <p className="text-xs font-medium text-white mt-0.5">{bill.dueDate}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] text-textSecondary">Total Amount</p>
                                                            <p className="text-sm font-bold text-white mt-0.5">{formatRupiah(bill.amount)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-surface border border-border rounded-xl">
                                <p className="text-textSecondary text-sm">No billing records found.</p>
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </div>
    );
}