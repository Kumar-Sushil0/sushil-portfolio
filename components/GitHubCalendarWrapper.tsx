'use client';
import { GitHubCalendar } from 'react-github-calendar';
import { useEffect, useState } from 'react';

const YEAR = 2026;
const USERNAME = 'Kumar-Sushil0';

const GitHubCalendarWrapper = () => {
    const [contributions, setContributions] = useState<number | null>(null);

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${YEAR}`)
            .then((r) => r.json())
            .then((data) => {
                const total = data?.total?.[YEAR];
                if (typeof total === 'number') setContributions(total);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Desktop — full calendar grid */}
            <div className="hidden sm:block">
                <GitHubCalendar
                    username={USERNAME}
                    year={YEAR}
                    colorScheme="dark"
                    theme={{ dark: ['#2d2d2d', '#00d97e'] }}
                    blockSize={13}
                    blockMargin={4}
                    fontSize={12}
                />
            </div>

            {/* Mobile — plain text count */}
            <div className="sm:hidden text-center text-sm text-muted-foreground">
                {contributions !== null
                    ? <>{contributions.toLocaleString()} GitHub contributions in {YEAR}</>
                    : 'Loading contributions...'}
            </div>
        </div>
    );
};

export default GitHubCalendarWrapper;
