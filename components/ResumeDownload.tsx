'use client';
import { FileDown } from 'lucide-react';

const ResumeDownload = () => {
    return (
        <div className="max-md:hidden fixed bottom-10 left-5 md:left-10 z-[4] flex flex-col items-center gap-3">
            <a
                href="/Sushil_Kumar_Resume.pdf"
                download="Sushil_Kumar_Resume.pdf"
                className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
                <span
                    className="text-sm tracking-[1px] transition-colors duration-300"
                    style={{
                        textOrientation: 'mixed',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                    }}
                >
                    Download CV
                </span>
                <FileDown
                    size={16}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1"
                />
            </a>
        </div>
    );
};

export default ResumeDownload;
