'use client';
import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';
import { IProject } from '@/types';
import { MORE_PROJECTS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { useRef, useState, MouseEvent } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
    projects: IProject[];
}

const AllProjectsView = ({ projects }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainer = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(
        projects[0]?.slug ?? null,
    );

    useGSAP(
        () => {
            gsap.set('.fade-in', { autoAlpha: 0, y: 30 });
            gsap.to('.fade-in', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.06,
                delay: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        (context, contextSafe) => {
            if (window.innerWidth < 768) {
                setSelectedProject(null);
                return;
            }

            const handleMouseMove = contextSafe?.((e: MouseEvent) => {
                if (!containerRef.current || !imageContainer.current) return;
                if (window.innerWidth < 768) return;

                const containerRect = containerRef.current.getBoundingClientRect();
                const imageRect = imageContainer.current.getBoundingClientRect();
                const offsetTop = e.clientY - containerRect.y;

                if (
                    containerRect.y > e.clientY ||
                    containerRect.bottom < e.clientY ||
                    containerRect.x > e.clientX ||
                    containerRect.right < e.clientX
                ) {
                    return gsap.to(imageContainer.current, { duration: 0.3, opacity: 0 });
                }

                gsap.to(imageContainer.current, {
                    y: offsetTop - imageRect.height / 2,
                    duration: 1,
                    opacity: 1,
                });
            }) as any;

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        },
        { scope: containerRef, dependencies: [containerRef.current] },
    );

    const handleMouseEnter = (slug: string) => {
        if (window.innerWidth < 768) return;
        setSelectedProject(slug);
    };

    return (
        <section className="pt-5 pb-16">
            <div className="container">
                <TransitionLink
                    back
                    href="/"
                    className="mb-10 inline-flex gap-2 items-center group h-12 fade-in"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back
                </TransitionLink>

                <h1 className="fade-in text-4xl sm:text-6xl md:text-7xl font-anton mb-12 leading-none">
                    ALL <span className="text-primary">PROJECTS</span>
                </h1>

                <div className="group/projects relative" ref={containerRef}>
                    {selectedProject !== null && (
                        <div
                            className="max-md:hidden absolute right-0 top-0 z-[1] pointer-events-none w-[200px] xl:w-[350px] aspect-[3/4] overflow-hidden opacity-0"
                            ref={imageContainer}
                        >
                            {projects.map((project) => (
                                <Image
                                    key={project.slug}
                                    src={project.thumbnail}
                                    alt={project.title}
                                    width={400}
                                    height={500}
                                    className={cn(
                                        'absolute inset-0 transition-all duration-500 w-full h-full object-cover',
                                        { 'opacity-0': project.slug !== selectedProject },
                                    )}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col">
                        {projects.map((project, index) => (
                            <TransitionLink
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                className="fade-in group leading-none py-5 border-b first:!pt-0 last:pb-0 last:border-none md:group-hover/projects:opacity-30 md:hover:!opacity-100 transition-all"
                                onMouseEnter={() => handleMouseEnter(project.slug)}
                            >
                                {selectedProject === null && (
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        width={300}
                                        height={200}
                                        className="w-full object-cover mb-5 aspect-[3/2] object-top"
                                        loading="lazy"
                                    />
                                )}
                                <div className="flex gap-2 md:gap-5">
                                    <div className="font-anton text-muted-foreground text-sm md:text-base pt-1">
                                        _{(index + 1).toString().padStart(2, '0')}.
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-anton transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left leading-tight">
                                            {project.title}
                                        </h2>
                                        <div className="mt-2 flex flex-wrap gap-2 text-muted-foreground text-xs">
                                            {project.techStack.slice(0, 3).map((tech, idx, arr) => (
                                                <div key={tech} className="gap-2 flex items-center">
                                                    <span>{tech}</span>
                                                    {idx !== arr.length - 1 && (
                                                        <span className="inline-block size-1.5 rounded-full bg-background-light" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="self-center text-sm text-muted-foreground font-anton shrink-0">
                                        {project.year}
                                    </div>
                                </div>
                            </TransitionLink>
                        ))}
                    </div>
                </div>

                {/* More Projects */}
                <div className="mt-20">
                    <h2 className="text-xl uppercase font-anton text-muted-foreground mb-8 tracking-widest border-b border-border pb-4">
                        More Work
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px border border-border">
                        {MORE_PROJECTS.map((project) => (
                            <a
                                key={project.url}
                                href={project.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="fade-in group flex items-center justify-between p-5 border-border hover:bg-background-light transition-all duration-300"
                            >
                                <span className="font-anton text-lg group-hover:text-primary transition-colors duration-300">
                                    {project.title}
                                </span>
                                <ExternalLink
                                    size={16}
                                    className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300 ml-3"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllProjectsView;
