import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer({ userType }) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "backInOut"}}
      className="bg-surface text-textPrimary py-10 px-6 md:px-12"
    >
      {!userType && <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo Section */}
        <div>
          <Link to="/" className="text-2xl font-bold text-primary">
            Sibrio
          </Link>
          <p className="mt-2 text-textSecondary">We do not take responsibility for any losses from gambling in casinos and betting sites which are linked or promoted on our website(s). As a player, you are responsible for your bets.</p>
        </div>

        {/* Quick Links */}
        <div className='md:flex md:items-end md:flex-col'>
          <h4 className="text-lg font-semibold text-primary mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/leaderboards" className="hover:text-primary">Leaderboards</Link></li>
            <li><Link to="/login" className="hover:text-primary">Admin Login</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div className='md:flex md:items-end md:flex-col'>
          <h4 className="text-lg font-semibold text-primary mb-3">Follow Me</h4>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-textSecondary hover:text-primary text-xl">
              <FaTwitter />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-textSecondary hover:text-primary text-xl">
              <FaDiscord />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-textSecondary hover:text-primary text-xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>}

      {/* Footer Bottom */}
      <div className="text-sm text-textSecondary text-center mt-10 border-t border-border pt-6">
        &copy; {new Date().getFullYear()} Sibrio.com. All rights reserved.
      </div>
    </motion.footer>
  );
}
