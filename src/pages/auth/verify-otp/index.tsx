import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function OTPVerification() {
    const navigate = useNavigate();
    const phone = sessionStorage.getItem('tempPhone') || '81234567890';
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '' && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length === 4) {
            navigate('/home');
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-background p-6">
            <div className="flex items-center mb-8 pt-4">
                <button
                    onClick={() => navigate('/login')}
                    className="p-2 -ml-2 rounded-full hover:bg-surface text-textSecondary hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
                <div className="mb-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <ShieldCheck className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Verifikasi OTP</h2>
                    <p className="text-textSecondary text-sm leading-relaxed">
                        Masukkan 4 digit kode yang telah kami kirimkan ke WhatsApp <br />
                        <span className="font-semibold text-white">+62 {phone}</span>
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8 mt-4">
                    <div className="flex justify-between gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-16 h-16 bg-surface border border-border rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        ))}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-4 text-base font-semibold bg-primary hover:bg-primary/90 text-black rounded-xl"
                        disabled={otp.join('').length < 4}
                    >
                        Verifikasi & Masuk
                    </Button>

                    <p className="text-center text-sm text-textSecondary mt-6">
                        Belum menerima kode? <button type="button" className="text-primary font-medium hover:underline">Kirim Ulang</button>
                    </p>
                </form>
            </div>
        </div>
    );
}