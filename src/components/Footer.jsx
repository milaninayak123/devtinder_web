const Footer = () => {
    return (
      <footer className="footer bg-base-300 text-neutral-content p-4 w-full fixed bottom-0 flex justify-between items-center">
        <aside>
          <p className="text-center w-full">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>
        <nav className="flex gap-2">
          {/* Optional nav items */}
        </nav>
      </footer>
    );
  };
  
  export default Footer;
  