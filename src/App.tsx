import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects'; // Fixes the Work resolution error
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import SocialSidebar from './components/SocialSidebar';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans antialiased">

      {/* 1. Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      {/* 2. Global UI Overlays */}
      <CustomCursor />
      <Header />
      <SocialSidebar />
      <RightSidebar />

      {/* 3. Main Content Flow */}
      <main className="relative z-10">
        <section id="hero">
          <Hero />
        </section>

        <section id="projects">
          {/* This now displays the 3 case studies and 90% zoom gallery */}
          <Projects />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </main>

      {/* 4. AI Assistant Interface */}
      <AIChat />
    </div>
  );
}

export default App;