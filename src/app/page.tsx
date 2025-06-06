
import ProfileSection from '@/components/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection';
import InterestsSection from '@/components/InterestsSection';
import BackToTopButton from '@/components/BackToTopButton';
import Footer from '@/components/Footer';
import LeftSidebar from '@/components/LeftSidebar';
import BottomNavigationBar from '@/components/BottomNavigationBar';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <LeftSidebar />
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 prevents content from overflowing flex container */}
        <main className="flex-grow overflow-y-auto">
          <ProfileSection />
          <ProjectsSection />
          <InterestsSection />
        </main>
        <Footer />
      </div>
      <BackToTopButton />
      <BottomNavigationBar />
    </div>
  );
}
