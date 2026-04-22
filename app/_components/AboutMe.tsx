'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="py-16 md:pb-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-thin mb-10 md:mb-20 slide-up-and-fade leading-snug">
                    I believe the best products are built at the intersection of
                    clean engineering and thoughtful design — and I spend every
                    day trying to get there.
                </h2>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 mt-9 gap-6 md:gap-[25px]">
                    <div className="md:col-span-5">
                        <p className="text-3xl sm:text-5xl slide-up-and-fade">
                            Hi, I&apos;m Sushil Kumar.
                        </p>
                        <p className="text-muted-foreground mt-3 slide-up-and-fade">
                            BCA Graduate, MIT-ADT University, Pune
                        </p>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-base sm:text-lg text-muted-foreground max-w-[450px]">
                            <p className="slide-up-and-fade">
                                I&apos;m a full stack developer who genuinely
                                enjoys the craft — from architecting backends to
                                obsessing over animations that feel just right.
                                I don&apos;t just build things that work; I
                                build things that feel good to use.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                What drives me is the pursuit of interesting
                                problems. I&apos;m constantly looking for
                                projects that push me into unfamiliar territory
                                — whether that&apos;s a new tech stack, a
                                complex UX challenge, or an idea that
                                hasn&apos;t been done before. Comfort zones
                                aren&apos;t really my thing.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                I care deeply about the people I work with.
                                Good collaboration, honest feedback, and shared
                                ambition make the difference between a project
                                that&apos;s just shipped and one that&apos;s
                                actually great. I&apos;m always looking to be
                                around people who take their work seriously but
                                know how to have fun doing it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
