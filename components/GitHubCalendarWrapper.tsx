'use client';
import { GitHubCalendar } from 'react-github-calendar';
import { useState } from 'react';

const currentYear = new Date().getFullYear();

const GitHubCalendarWrapper = () => {
    const [year, setYear] = useState(currentYear);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
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

            {/* Desktop: normal horizontal */}
            <div className="hidden sm:block">
                <GitHubCalendar
                    username="Kumar-Sushil0"
                    year={year}
                    colorScheme="dark"
                    theme={{ dark: ['#2d2d2d', '#00d97e'] }}
                    blockSize={13}
                    blockMargin={4}
                    fontSize={12}
                />
            </div>

            {/* Mobile: rotated 90deg so weeks stack vertically */}
            <div className="sm:hidden w-full flex justify-center">
                <div
                    style={{
                        transform: 'rotate(90deg)',
                        transformOrigin: 'center center',
                        width: '80vw',
                        height: '80vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <GitHubCalendar
                        username="Kumar-Sushil0"
                        year={year}
                        colorScheme="dark"
                        theme={{ dark: ['#2d2d2d', '#00d97e'] }}
                        blockSize={10}
                        blockMargin={3}
                        fontSize={9}
                        hideColorLegend
                        hideTotalCount
                    />
                </div>
            </div>
        </div>
    );
};

export default GitHubCalendarWrapper;
