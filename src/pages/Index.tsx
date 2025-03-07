
import { useEffect, useRef } from 'react';
import { ArrowRight, FileText, Search, MessageSquare, UserCheck, BellRing, ChevronDown } from 'lucide-react';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // For staggered animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: FileText,
      title: "Easy Submission",
      description: "Submit complaints with a simple, intuitive form that guides you through each step."
    },
    {
      icon: Search,
      title: "Real-time Tracking",
      description: "Track the status of your complaint in real-time with automatic notifications."
    },
    {
      icon: MessageSquare,
      title: "AI Assistance",
      description: "Get help from our AI chatbot to guide you through the complaint process."
    },
    {
      icon: UserCheck,
      title: "Dedicated Resolution",
      description: "Complaints are routed to the right department for faster resolution."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Your Complaint",
      description: "Fill out our simple form with your contact information and complaint details."
    },
    {
      number: "02",
      title: "Receive Confirmation",
      description: "Get an immediate confirmation with your unique tracking ID via SMS and email."
    },
    {
      number: "03",
      title: "Track Progress",
      description: "Follow the status of your complaint in real-time through our tracking dashboard."
    },
    {
      number: "04",
      title: "Resolution",
      description: "Receive updates as your complaint is resolved by the appropriate department."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white"></div>
        
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                <BellRing className="mr-1 h-3.5 w-3.5" />
                Modern Complaint Management
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Complaint management <span className="text-primary">simplified</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                An efficient, user-friendly system for submitting and tracking citizen complaints, designed with modern principles for a seamless experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton to="/submit" size="lg">
                  Register a Complaint
                </AnimatedButton>
                <AnimatedButton to="/track" variant="outline" size="lg">
                  Track Your Complaint
                </AnimatedButton>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <GlassCard className="relative p-1 md:p-2 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Complaint Management System" 
                  className="w-full h-auto rounded-xl"
                />
                
                <div className="absolute bottom-5 left-5 right-5 glass-card p-4 md:p-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
                  <h3 className="text-lg font-semibold mb-2">Easy to access, easy to use</h3>
                  <p className="text-sm text-muted-foreground">Our intuitive interface makes submitting and tracking complaints effortless.</p>
                </div>
              </GlassCard>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              variant="ghost" 
              onClick={scrollToFeatures}
              className="animate-float"
            >
              <span className="mr-2">Learn more</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Streamlined Complaint Management</h2>
            <p className="text-lg text-muted-foreground">
              Our system makes it easy to submit, track, and resolve complaints with powerful features designed around user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <GlassCard 
                key={index} 
                className="p-6 animate-on-scroll" 
                hoverEffect={true}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              A simple, transparent process from complaint submission to resolution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-on-scroll" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t border-dashed border-primary/30"></div>
                )}
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="bg-primary/10 text-primary font-bold rounded-full w-16 h-16 flex items-center justify-center text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
            <AnimatedButton to="/submit" size="lg">
              Get Started
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <GlassCard className="rounded-2xl overflow-hidden relative animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10"></div>
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to submit your complaint?</h2>
                <p className="text-lg text-muted-foreground mb-0">
                  Our streamlined system ensures your voice is heard and your concerns are addressed promptly.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton to="/submit" size="lg">
                  Register a Complaint
                </AnimatedButton>
                <AnimatedButton to="/track" variant="outline" size="lg">
                  Track Existing Complaint
                </AnimatedButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Index;
