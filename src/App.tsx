import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './styles/global.scss';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Focus MediaTech. All rights reserved.</p>
          <p>Built with React, TypeScript, Framer Motion & SCSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
