
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4 border-b border-neutral-700">
      <h1 className="text-4xl md:text-5xl font-bold text-brat-green tracking-tighter">
        Brat Font Generator
      </h1>
      <p className="text-neutral-400 mt-2 text-lg">
        open source
      </p>
    </header>
  );
};

export default Header;
