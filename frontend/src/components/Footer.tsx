/**
 * BiUD Frontend - Footer Component
 * Gold & Black Metallic Theme
 */

'use client';

export default function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-metal-900/80 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold metallic-text mb-4">BiUD</h3>
            <p className="text-metal-400 max-w-sm">
              The premier Bitcoin username service. Own your digital identity on the most secure blockchain.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-metal-400 hover:text-gold-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-metal-400 hover:text-gold-400 transition-colors">API</a></li>
              <li><a href="#" className="text-metal-400 hover:text-gold-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-metal-400 hover:text-gold-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="text-metal-400 hover:text-gold-400 transition-colors">Discord</a></li>
              <li><a href="#" className="text-metal-400 hover:text-gold-400 transition-colors">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-metal-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-metal-500 text-sm">
            © 2026 BiUD. Built on Bitcoin.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-metal-600 text-sm">Powered by</span>
            <span className="metallic-text-static font-semibold">Stacks</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
