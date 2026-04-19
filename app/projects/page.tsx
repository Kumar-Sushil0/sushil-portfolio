import { PROJECTS } from '@/lib/data';
import { Metadata } from 'next';
import AllProjectsView from './_components/AllProjectsView';

export const metadata: Metadata = {
    title: 'Projects - Sushil Kumar',
    description: 'All projects by Sushil Kumar',
};

const ProjectsPage = () => {
    return <AllProjectsView projects={PROJECTS} />;
};

export default ProjectsPage;
