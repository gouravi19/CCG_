import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ContactDetails from "./pages/ContactDetails";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

library.add(fab);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-details" element={<ContactDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
