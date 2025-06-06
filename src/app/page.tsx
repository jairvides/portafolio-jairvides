
import ProfileSection from '@/components/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection';
import InterestsSection from '@/components/InterestsSection';
import BackToTopButton from '@/components/BackToTopButton';
import Footer from '@/components/Footer';
import LeftSidebar from '@/components/LeftSidebar';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <LeftSidebar />
      <div className="flex-1 md:ml-[33.333333%] lg:ml-[30%] xl:ml-[25%] flex flex-col"> {/* Adjust margin to match sidebar width */}
        <main className="flex-grow overflow-y-auto">
          <ProfileSection />
          <ProjectsSection />
          <InterestsSection />
        </main>
        <Footer />
      </div>
      <BackToTopButton />
    </div>
  );
}
