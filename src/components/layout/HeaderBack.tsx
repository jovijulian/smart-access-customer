import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, User } from 'lucide-react';

interface headerBackProps {
    title: string
    url?: string
}
export function HeaderBack({ title, url }: headerBackProps) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-4 py-4 flex items-center">
            <button
                onClick={() => {
                    if (url) {
                        navigate(url)
                    } else if (window.history.length > 1) {
                        navigate(-1)
                    } else {
                        navigate('/')
                    }
                }}
                className="p-2 -ml-2 rounded-full hover:bg-surface text-textSecondary hover:text-white transition-colors"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="ml-2 font-semibold text-white">{title}</h1>
        </header>
    );
}
