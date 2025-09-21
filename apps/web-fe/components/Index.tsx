import React from 'react';
import { 
  Palette, 
  Users, 
  Share2, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Globe,
  Lock,
  Timer,
  UserCircle2,
  Users2,
  Github,
  GithubIcon,
} from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';

function Index() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Logo />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</a>
              <Link href={'/signup'}>
              <button className="bg-white text-black px-4 py-1 text-sm rounded-lg text-center hover:bg-gray-200 transition-all transform hover:scale-105 font-medium">
                Get Started
              </button>
              </Link>
              <Link target="_blank" href={'https://github.com/Auti29/doodleX'}>
              <button className='border-2 border-gray-400 rounded-lg pl-2 pr-2 pt-0.5 pb-0.5 cursor-pointer bg-black flex text-xs justify-center items-center' 
              ><GithubIcon size={23} className='bg-black text-white p-1'/><span className='font-mono'>Github</span></button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Collaborative whiteboarding reimagined
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Create, Collaborate,
            <br />
            <span className="text-white">
              Innovate Together
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Turn your ideas into visual masterpieces with doodleX. Create unlimited spaces, 
            invite your team, and watch creativity flow in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={'/signup'}>
            <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center">
              Start Creating Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            </Link>
            <Link href={'/demo'}>
            <button className="border border-gray-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
              Watch Demo
            </button>
            </Link>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gray-600/10 blur-3xl"></div>
            <div className="relative bg-gray-800 rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-3 bg-gray-600 rounded-full"></div>
                <div className="h-3 bg-gray-600 rounded-full"></div>
                <div className="h-3 bg-gray-600 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Palette className="h-6 w-6 text-black" />
                  </div>
                  <div className="flex-1 h-4 bg-gray-700 rounded"></div>
                  <div className="w-20 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-gray-700/30 rounded-lg border border-gray-600"></div>
                  <div className="h-32 bg-gray-700/30 rounded-lg border border-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to create</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful tools designed for seamless collaboration and unlimited creativity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors group">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Collaboration</h3>
              <p className="text-gray-300">
                Work together in real-time. See cursors, changes, and ideas as they happen.
              </p>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors group">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform">
                <Share2 className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Sharing</h3>
              <p className="text-gray-300">
                Share your space with a simple link. No accounts required for collaborators.
              </p>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors group">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-300">
                Blazing fast performance with smooth interactions and instant sync.
              </p>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors group">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Access Anywhere</h3>
              <p className="text-gray-300">
                Work from any device, anywhere. Your spaces are always accessible.
              </p>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors group">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Privacy First</h3>
              <p className="text-gray-300">
                Your data stays private. End-to-end encryption for sensitive projects.
              </p>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors group">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform">
                <Timer className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Version History</h3>
              <p className="text-gray-300">
                Never lose work. Automatic saving with full version history.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get started in seconds</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From idea to collaboration in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Create Your Space</h3>
              <p className="text-gray-300 leading-relaxed">
                Start with a blank canvas or choose from our templates. No setup required.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Share & Invite</h3>
              <p className="text-gray-300 leading-relaxed">
                Copy your space link and share it with anyone. They join instantly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Collaborate</h3>
              <p className="text-gray-300 leading-relaxed">
                Draw, annotate, and brainstorm together in real-time. Watch ideas come to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 flex">Why teams choose doodleX?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Unlimited Creativity</h3>
                    <p className="text-gray-300">No limits on canvas size, elements, or collaborators. Create as big as your ideas.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Zero Learning Curve</h3>
                    <p className="text-gray-300">Intuitive interface that everyone can use. Start creating in seconds, not hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Always in Sync</h3>
                    <p className="text-gray-300">Real-time updates ensure everyone sees changes instantly. Never miss a beat.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cross-Platform</h3>
                    <p className="text-gray-300">Works seamlessly on desktop, tablet, and mobile. Collaborate from anywhere.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gray-600/10 blur-3xl"></div>
              <div className="relative bg-gray-800 rounded-2xl border border-gray-700 p-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <UserCircle2 />
                      <span className="text-md font-bold text-gray-300">Alice is drawing...</span>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="bg-gray-500 rounded-full border-2 border-gray-800 p-2"><Users2 size={15}/></div>
                      <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs text-white">+2</div>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-700/30 rounded-lg border border-gray-600 flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="h-12 w-12 text-white mx-auto mb-2" />
                      <p className="text-gray-300">Real-time collaboration in action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start creating?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of teams already using doodleX to bring their ideas to life
          </p>
          <Link href={'/signup'}>
          <button className="bg-white text-black px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 inline-flex items-center cursor-pointer">
            Create Your First Space
            <ArrowRight className="ml-3 h-6 w-6" />
          </button>
          </Link>
          <p className="text-sm text-gray-400 mt-4">Free forever • No credit card required</p>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Logo />
            </div>
            <div className="flex space-x-8 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 doodleX. Made by someone who is in your ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;