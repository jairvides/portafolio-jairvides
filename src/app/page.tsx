
import Header from '@/components/Header';
import ProfileSection from '@/components/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection';
import InterestsSection from '@/components/InterestsSection';
import BackToTopButton from '@/components/BackToTopButton';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ProfileSection />
        <ProjectsSection />
        <InterestsSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
