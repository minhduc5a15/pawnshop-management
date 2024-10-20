import * as React from 'react';
import { Button, ButtonProps } from './button';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
    value: string;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(({ value, ...props }, ref) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <Button onClick={handleCopy} ref={ref} size="default" variant={'default'} {...props}>
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
    );
});

CopyButton.displayName = 'CopyButton';

export { CopyButton };
