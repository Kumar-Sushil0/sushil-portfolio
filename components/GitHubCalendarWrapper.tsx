'use client';
import { GitHubCalendar } from 'react-github-calendar';
import { useState } from 'react';

const currentYear = new Date().getFullYear();

const GitHubCalendarWrapper = () => {
    const [year, setYear] = useState(currentYear);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                {[currentYear, currentYear - 1].map((y) => (
                    <button
                        key={y}
                        onClick={() => setYear(y)}
                        className={`px-4 py-1.5 text-sm font-medium transition-all border ${
                            year === y
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
                        }`}
                    >
                        {y}
                    </button>
                ))}
            </div>
            <GitHubCalendar
                username="Kumar-Sushil0"
                year={year}
                colorScheme="dark"
                theme={{
                    dark: ['#2d2d2d', '#00d97e'],
                }}
                blockSize={13}
                blockMargin={4}
                fontSize={12}
            />
        </div>
    );
};

export default GitHubCalendarWrapper;
