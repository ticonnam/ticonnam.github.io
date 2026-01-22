import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import SocialSidebar from './components/SocialSidebar';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden font-sans antialiased">
      <CustomCursor />
      <Header />
      <SocialSidebar />
      <RightSidebar />

      <main className="relative z-10">
        <Hero />

        {/* ID updated to resolve INP navigation hang */}
        <section id="projects">
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

      <AIChat />
    </div>
  );
}

export default App;