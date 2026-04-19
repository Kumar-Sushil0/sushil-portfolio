'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // move the content a little up on scroll
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
                    <Button
                        as="link"
                        href={`mailto:${GENERAL_INFO.email}`}
                        variant="primary"
                        className="mt-8 banner-button slide-up-and-fade"
                    >
                        Hire Me
                    </Button>
                </div>

                <div className="flex md:flex-col gap-6 md:gap-8 md:absolute md:bottom-[10%] md:right-[4%] md:text-right">
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1">
                            3+
                        </h5>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Years of Experience
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1">
                            7+
                        </h5>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Completed Projects
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1">
                            10K+
                        </h5>
                        <p className="text-sm sm:text-base text-muted-foreground">Hours Worked</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
