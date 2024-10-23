'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

// Context for managing select state
const SelectContext = createContext<{
    isOpen: boolean;
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    toggleOpen: () => void;
} | null>(null);

interface SelectProps {
    children: React.ReactNode;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const Select = forwardRef(({ children, placeholder = 'Select an option', onChange }: SelectProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelectValue = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
        onChange && onChange(value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Expose selectedValue to parent component using ref
    useImperativeHandle(ref, () => ({
        getValue: () => selectedValue,
    }));

    return (
        <SelectContext.Provider value={{ isOpen, selectedValue, setSelectedValue: handleSelectValue, toggleOpen }}>
            <div className="relative w-64" ref={selectRef}>
                <button
                    className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={toggleOpen}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    {selectedValue || placeholder}
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                </button>
                {isOpen && (
                    <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60" role="listbox">
                        {children}
                    </ul>
                )}
            </div>
        </SelectContext.Provider>
    );
});

interface SelectOptionProps {
    value: string;
    children: React.ReactNode;
}

export function SelectOption({ value, children }: SelectOptionProps) {
    const context = useContext(SelectContext);
    if (!context) throw new Error('SelectOption must be used within a Select');

    const { selectedValue, setSelectedValue } = context;

    const isSelected = selectedValue === value;

    return (
        <li
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${isSelected ? 'bg-blue-200' : ''}`}
            onClick={() => setSelectedValue(value)}
            role="option"
            aria-selected={isSelected}
        >
            {children}
        </li>
    );
}
