import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Login() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length > 8) {
            sessionStorage.setItem('tempPhone', phone);
            navigate('/verify-otp');
        }
    };

    return (
        <div className="flex-1 flex flex-col p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface via-background to-background justify-center">

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(0,230,118,0.3)] mb-6">
                        <span className="font-bold text-white text-3xl">S</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Smart Access</h1>
                    <p className="text-textSecondary text-sm">Masuk untuk mengelola akses properti Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-textSecondary">Nomor Handphone</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-textSecondary font-medium">+62</span>
                                <div className="h-4 w-px bg-border ml-3"></div>
                            </div>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                className="w-full bg-surface border border-border rounded-xl pl-16 pr-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-lg tracking-wide"
                                placeholder="812 3456 7890"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-black flex items-center justify-center space-x-2 rounded-xl"
                        disabled={phone.length < 8}
                    >
                        <span>Kirim Kode OTP</span>
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </form>
            </div>

        </div>
    );
}