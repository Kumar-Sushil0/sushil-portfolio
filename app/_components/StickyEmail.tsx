import { GENERAL_INFO } from '@/lib/data';
import React from 'react';

const StickyEmail = () => {
    return (
        <div className="max-md:hidden fixed top-1/2 -translate-y-1/2 left-5 md:left-10 z-[4]">
            <a
                href={`mailto:${GENERAL_INFO.email}`}
                className="text-muted-foreground tracking-[1px] transition-all hover:text-foreground text-sm"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    transformOrigin: 'center center',
                }}
            >
                {GENERAL_INFO.email}
            </a>
        </div>
    );
};

export default StickyEmail;
