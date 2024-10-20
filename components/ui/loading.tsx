import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingProps {
    isFullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isFullScreen = false }) => (
    <div className={`${isFullScreen ? 'fixed inset-0 bg-background/70 backdrop-blur-sm' : 'relative w-full h-full min-h-[100px]'} flex items-center justify-center`}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
)