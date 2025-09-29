import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About SportBook
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting sports enthusiasts with premium venues across the country
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To make sports venue booking seamless and accessible for everyone. We believe that finding and booking quality sports facilities should be as easy as a few clicks, enabling more people to stay active and pursue their passion for sports.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the leading platform for sports venue discovery and booking, fostering a vibrant community of athletes, venue owners, and sports enthusiasts while promoting active lifestyles nationwide.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Why Choose SportBook?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Premium Venues</h3>
                <p className="text-muted-foreground">Access to top-quality sports facilities with professional-grade equipment and amenities.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Instant Booking</h3>
                <p className="text-muted-foreground">Book your favorite courts and fields instantly with real-time availability updates.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Best Prices</h3>
                <p className="text-muted-foreground">Competitive pricing with transparent costs and flexible payment options.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sports Supported */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Sports We Support</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Cricket", "Football", "Tennis", "Badminton", "Basketball", "Volleyball", "Table Tennis", "Swimming"].map((sport) => (
              <Badge key={sport} variant="secondary" className="text-lg py-2 px-4">
                {sport}
              </Badge>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're a passionate team of sports enthusiasts, technology experts, and business professionals 
            dedicated to revolutionizing how people discover and book sports venues. Our diverse backgrounds 
            in athletics, software development, and customer service drive us to create the best possible 
            experience for our users.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};