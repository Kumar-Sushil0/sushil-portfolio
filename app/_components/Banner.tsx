'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef, useEffect, useState, useMemo } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
 
const USERNAME = 'Kumar-Sushil0';


const CodeCard = ({ contributions }: { contributions: number }) => {
    // flat string of all chars with their color, plus line breaks
    type CharEntry = { char: string; color: string; isNewLine?: boolean };

    const codeLines = useMemo(() => [
        { tokens: [{ text: 'const ', color: 'text-purple-400' }, { text: 'developer', color: 'text-foreground' }, { text: ' = {', color: 'text-foreground' }] },
        { tokens: [{ text: '  name', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: '"Sushil Kumar"', color: 'text-primary' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  role', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: '"Full-Stack Developer"', color: 'text-primary' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  focus', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: '"Scalable Web Systems"', color: 'text-primary' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  experience', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: '"3+ years"', color: 'text-primary' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  projects', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: '"15+"', color: 'text-primary' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  github_contributions', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: `"${contributions}+"`, color: 'text-primary' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  stack', color: 'text-blue-400' }, { text: ': [', color: 'text-foreground' }] },
        { tokens: [{ text: '  ]', color: 'text-foreground' }, { text: ',', color: 'text-foreground' }] },
        { tokens: [{ text: '  status', color: 'text-blue-400' }, { text: ': ', color: 'text-foreground' }, { text: '"Open to work"', color: 'text-primary' }] },
        { tokens: [{ text: '};', color: 'text-foreground' }] },
        { tokens: [] },
        { tokens: [{ text: 'const ', color: 'text-purple-400' }, { text: 'createMagic', color: 'text-yellow-400' }, { text: ' = () => ', color: 'text-foreground' }, { text: 'passion', color: 'text-blue-400' }, { text: ' + ', color: 'text-foreground' }, { text: '"Code"', color: 'text-primary' }, { text: ';', color: 'text-foreground' }] },
    ], [contributions]);

    const allChars = useMemo<CharEntry[]>(() => {
        const result: CharEntry[] = [];
        codeLines.forEach((line, li) => {
            line.tokens.forEach((token) => {
                for (const char of token.text) {
                    result.push({ char, color: token.color });
                }
            });
            if (li < codeLines.length - 1) result.push({ char: '\n', color: '', isNewLine: true });
        });
        return result;
    }, [codeLines]);

    const [typed, setTyped] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        // wait for preloader to finish (~2.8s) before starting typing
        const PRELOADER_DURATION = 2800;
        let i = 0;
        let interval: ReturnType<typeof setInterval>;

        const startTyping = () => {
            interval = setInterval(() => {
                i++;
                setTyped(i);
                if (i >= allChars.length) clearInterval(interval);
            }, 18);
        };

        const startDelay = setTimeout(startTyping, PRELOADER_DURATION);
        const cursorInterval = setInterval(() => setShowCursor(p => !p), 530);

        return () => {
            clearTimeout(startDelay);
            clearInterval(interval);
            clearInterval(cursorInterval);
        };
    }, [allChars.length]);

    // build lines from typed chars
    const lines: CharEntry[][] = [[]];
    for (let i = 0; i < typed; i++) {
        const entry = allChars[i];
        if (entry.isNewLine) {
            lines.push([]);
        } else {
            lines[lines.length - 1].push(entry);
        }
    }
    return (
        <div className="slide-up-and-fade hidden md:block w-[420px] xl:w-[480px] shrink-0">
            <div className="bg-background-light border border-border rounded-sm overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
                    <span className="size-3 rounded-full bg-red-500/70" />
                    <span className="size-3 rounded-full bg-yellow-500/70" />
                    <span className="size-3 rounded-full bg-primary/70" />
                    <span className="ml-3 text-xs text-muted-foreground font-mono">developer.ts</span>
                </div>
                <div className="p-5 font-mono text-sm leading-7 min-h-[340px]">
                    {lines.map((lineChars, li) => (
                        <div key={li} className="flex">
                            <span className="text-muted-foreground/40 w-6 shrink-0 text-right mr-4 select-none text-xs leading-7">
                                {li + 1}
                            </span>
                            <span>
                                {lineChars.map((c, ci) => (
                                    <span key={ci} className={c.color}>{c.char}</span>
                                ))}
                                {li === lines.length - 1 && typed < allChars.length && (
                                    <span className={`inline-block w-[2px] h-[1em] bg-primary align-middle ml-0.5 transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                                )}
                            </span>
                        </div>
                    ))}
                    {typed >= allChars.length && (
                        <div className="flex">
                            <span className="text-muted-foreground/40 w-6 shrink-0 text-right mr-4 select-none text-xs leading-7">{lines.length + 1}</span>
                            <span className={`inline-block w-[2px] h-[1em] bg-primary align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [totalContributions, setTotalContributions] = useState<number>(500);

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=all`)
            .then((r) => r.json())
            .then((data) => {
                const total = data?.total?.['lastYear'] ?? Object.values(data?.total ?? {}).reduce((a: number, b) => a + (b as number), 0);
                if (typeof total === 'number' && total > 0) setTotalContributions(total);
            })
            .catch(() => {});
    }, []);

    const stats = [
        { value: 3, suffix: '+', label: 'Years of Experience' },
        { value: 15, suffix: '+', label: 'Completed Projects' },
        { value: totalContributions, suffix: '+', label: 'GitHub Contributions' },
    ];

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    useGSAP(() => {
        stats.forEach((stat, i) => {
            const el = countersRef.current[i];
            if (!el) return;
            gsap.fromTo(
                el,
                { innerText: 0 },
                {
                    innerText: stat.value,
                    duration: 2,
                    delay: 0.8 + i * 0.15,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate() {
                        el.innerText = Math.round(Number(el.innerText)).toString();
                    },
                },
            );
        });
    });

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[600px] flex flex-col justify-center gap-10 md:flex-row md:justify-between md:items-center pb-10 pt-16 md:pt-0 md:pb-0"
                ref={containerRef}
            >
                <div className="flex flex-col items-start max-w-[544px]">
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-[clamp(3rem,12vw,80px)] font-anton">
                        <span className="text-primary">FULL STACK</span>
                        <br /> <span className="ml-4">DEVELOPER</span>
                    </h1>
                    <p className="banner-description slide-up-and-fade mt-5 text-base sm:text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Sushil
                        </span>
                        . A creative Full Stack Developer with 3+ years of
                        experience in building high-performance, scalable, and
                        responsive web solutions.
                    </p>


                    <a
                        href={`mailto:${GENERAL_INFO.email}`}
                        className="mt-8 banner-button slide-up-and-fade group h-12 px-8 inline-flex justify-center items-center gap-2 text-lg uppercase font-anton tracking-widest bg-primary text-primary-foreground relative overflow-hidden"
                    >
                        <span className="absolute top-[200%] left-0 right-0 h-full bg-white rounded-[50%] group-hover:top-0 transition-all duration-500 scale-150"></span>
                        <span className="z-[1]">Hire Me / Work With Me</span>
                    </a>
                    <a
                        href="/Sushil_Kumar_Resume.pdf"
                        download="Sushil_Kumar_Resume.pdf"
                        className="slide-up-and-fade mt-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Download CV
                    </a>
                </div>

                <CodeCard contributions={totalContributions} />

                {/* Stats — mobile only, row layout */}
                <div className="flex md:hidden gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="slide-up-and-fade">
                            <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1">
                                {stat.value}{stat.suffix}
                            </h5>
                            <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
