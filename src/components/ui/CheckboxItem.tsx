import React from 'react';
import { CheckIcon } from './CheckIcon';

interface CheckboxItemProps {
    children: React.ReactNode;
}

export function CheckboxItem({ children }: CheckboxItemProps) {
    return (
        <div className="flex relative gap-2 items-center">
            <div className="flex relative gap-2 items-start p-1.5 bg-gray-100 rounded-[100px]">
                <CheckIcon />
            </div>
            <span className="relative text-base leading-7 text-zinc-800 max-sm:text-sm max-sm:leading-6">
        {children}
      </span>
        </div>
    );
}
