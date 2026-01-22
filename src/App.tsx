import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import SocialSidebar from './components/SocialSidebar';
import RightSidebar from './components/RightSidebar';

/**
 * Main Application Component
 * Managed Z-Index Hierarchy:
 * - CustomCursor: z-[9999] (Highest)
 * - Navigation & Assistant: z-[100-110]
 * - Sidebars: z-[100]
 * - Main Content: z-10
 * - Background Blobs: z-0 (Lowest)
 */
function App() {
  return (
    <div className="bg-[#0a0c10] min-h-screen text-white relative selection:bg-indigo-500/30 selection:text-white">
      
      {/* 1. Global Interactive Overlays */}
      <CustomCursor />
      <SocialSidebar />
      <RightSidebar />
      <Header />

      {/* 2. Main Scrollable Content */}
      <main className="relative z-10 w-full overflow-x-hidden">
        {/* Cinematic Hero Entrance */}
        <Hero />
        
        {/* UX Case Studies Section */}
        <Work />
        
        {/* Biography & Skills Section */}
        <About />
        
        {/* High-Intent Contact Section */}
        <Contact />
      </main>

      {/* 3. Global Signature Footer */}
      <Footer />

      {/* 4. AI Portfolio Assistant */}
      <AIChat />

      {/* 5. Fixed Background Atmospheric Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Indigo Glow */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        
        {/* Bottom-Right Purple Glow */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full" />
        
        {/* Subtle Grain Overlay for Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>
    </div>
  );
}

export default App;