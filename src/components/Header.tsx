import React from 'react';

const Header = () => {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' }, // Matches the updated section ID
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-serif tracking-tighter italic">
          TM<span className="text-indigo-500">.</span>
        </div>

        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors duration-200 group will-change-[color,transform]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;