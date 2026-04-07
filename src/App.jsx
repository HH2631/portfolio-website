import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import SmoothScroll from './components/layout/SmoothScroll';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgress from './components/animations/ScrollProgress';
import ParticleField from './components/3d/ParticleField';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WelcomeScreen from './Pages/WelcomeScreen';
import Home from './Pages/Home';
import About from './Pages/About';
import Portofolio from './Pages/Portofolio';
import ContactPage from './Pages/Contact';
import ProjectDetails from './components/ProjectDetail';
import ThankYouPage from './Pages/ThankYou';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const LandingPage = ({ showWelcome, setShowWelcome }) => (
  <>
    <AnimatePresence mode="wait">
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
    </AnimatePresence>

    {!showWelcome && (
      <>
        <ParticleField />
        <div className="noise-overlay" />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
        </main>
        <Footer />
      </>
    )}
  </>
);

const ProjectPageLayout = () => (
  <PageTransition>
    <ProjectDetails />
    <Footer />
  </PageTransition>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <CustomCursor />
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="/thank-you" element={<PageTransition><ThankYouPage /></PageTransition>} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
