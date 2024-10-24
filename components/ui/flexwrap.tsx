import React, { HTMLAttributes } from 'react';

interface FlexWrap extends HTMLAttributes<HTMLDivElement> {
    gap: number;
    children?: React.ReactNode;
}

export const FlexWrap: React.FC<FlexWrap> = ({ gap = 0, children, className, ...props }) => {
    return (
        <div className={`flex flex-wrap gap-${gap} ${className}`} {...props}>
            {children}
        </div>
    );
};