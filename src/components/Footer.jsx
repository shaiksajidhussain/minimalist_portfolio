import CurvedLoop from './CurvedLoop';

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-zinc-900 py-20 overflow-hidden border-t border-gray-200 dark:border-zinc-800">
      <div className="relative z-10">
        <CurvedLoop 
          marqueeText="Made by Sajid Hussain ✦"
          speed={2}
          curveAmount={400}
          direction="left"
          interactive={true}
          className="text-gray-900 dark:text-white"
        />
      </div>
    </footer>
  );
};

export default Footer;

