
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-primary">ComplaintCompass</h3>
            <p className="text-sm text-muted-foreground">
              A modern platform for efficient complaint management and resolution.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit Complaint
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-muted-foreground hover:text-primary transition-colors">
                  Track Complaint
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Government Plaza, City Center
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">help@complaintcompass.gov</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ComplaintCompass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
