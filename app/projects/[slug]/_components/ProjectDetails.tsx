'use client';
import parse from 'html-react-parser';
import ArrowAnimation from '@/components/ArrowAnimation';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { TECH_STACK_ICONS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ExternalLink, Github, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.5,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                // position: 'sticky',
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    // parallax effect on images
    useGSAP(
        () => {
            gsap.utils
                .toArray<HTMLDivElement>('#images > div')
                .forEach((imageDiv, i) => {
                    gsap.to(imageDiv, {
                        backgroundPosition: `center 0%`,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: imageDiv,
                            start: () => (i ? 'top bottom' : 'top 50%'),
                            end: 'bottom top',
                            scrub: true,
                            // invalidateOnRefresh: true, // to make it responsive
                        },
                    });
                });
        },
        { scope: containerRef },
    );

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-10 md:mb-16 inline-flex gap-2 items-center group h-12"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back
                </TransitionLink>

                <div
                    className="top-0 min-h-[calc(100svh-100px)] flex"
                    id="info"
                >
                    <div className="relative w-full">
                        <div className="mb-8 md:mb-10 max-w-[635px] mx-auto">
                            <h1 className="fade-in-later opacity-0 text-3xl sm:text-4xl md:text-[60px] leading-tight font-anton">
                                {project.liveUrl ? (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="group transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent hover:bg-left"
                                    >
                                        {project.title}
                                        <ExternalLink size={20} className="inline-block text-foreground group-hover:text-primary transition-colors ml-3 mb-1 align-middle" />
                                    </a>
                                ) : (
                                    project.title
                                )}
                            </h1>
                            {project.sourceCode && (
                                <a
                                    href={project.sourceCode}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="fade-in-later opacity-0 inline-flex items-center gap-1.5 mt-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Github size={16} /> Source Code
                                </a>
                            )}
                        </div>

                        <div className="max-w-[635px] space-y-6 md:space-y-7 pb-12 md:pb-20 mx-auto">
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-2">
                                    Year
                                </p>
                                <div className="text-base md:text-lg">{project.year}</div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Tech & Technique
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack.map((tech) => (
                                        <div
                                            key={tech}
                                            className="flex items-center gap-2 bg-background-light px-3 py-1.5 text-sm"
                                        >
                                            {TECH_STACK_ICONS[tech] && (
                                                <Image
                                                    src={TECH_STACK_ICONS[tech]}
                                                    alt={tech}
                                                    width={18}
                                                    height={18}
                                                    className="max-h-[18px] w-auto object-contain"
                                                />
                                            )}
                                            <span>{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-2">
                                    Description
                                </p>
                                <div className="text-base md:text-lg prose-xl markdown-text">
                                    {parse(project.description)}
                                </div>
                            </div>
                            {project.role && (
                                <div className="fade-in-later">
                                    <p className="text-muted-foreground font-anton mb-2">
                                        My Role
                                    </p>
                                    <div className="text-base md:text-lg">
                                        {parse(project.role)}
                                    </div>
                                </div>
                            )}
                        </div>

                        <ArrowAnimation />
                    </div>
                </div>

                <div
                    className="fade-in-later relative flex flex-col gap-2 max-w-[800px] mx-auto"
                    id="images"
                >
                    {project.images.map((image, index) => (
                        <>
                            <a
                                key={image}
                                href={image}
                                target="_blank"
                                className="group relative w-full bg-background-light block"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center 50%',
                                    backgroundRepeat: 'no-repeat',
                                    aspectRatio: image.includes('/long/') ? '3/4' : '750/400',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                <div className="absolute top-3 right-3 size-10 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <Maximize2 size={20} className="text-foreground" />
                                </div>
                            </a>

                            {/* Long thumbnail after first image — only if it's a distinct image */}
                            {index === 0 && project.longThumbnail && project.longThumbnail !== project.thumbnail && (
                                <a
                                    key="long-thumbnail"
                                    href={project.longThumbnail}
                                    target="_blank"
                                    className="group relative w-full bg-background-light overflow-hidden block"
                                    style={{
                                        backgroundImage: `url(${project.longThumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center 50%',
                                        backgroundRepeat: 'no-repeat',
                                        aspectRatio: '3/4',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                    <div className="absolute top-3 right-3 size-10 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <Maximize2 size={20} className="text-foreground" />
                                    </div>
                                </a>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
