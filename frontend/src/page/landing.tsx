import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Dumbbell, Heart, LineChart, Menu, Utensils, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: <Dumbbell className="h-10 w-10 text-primary" />,
      title: "Workout Tracking",
      description: "Log and track your workouts with detailed metrics and progress visualization.",
    },
    {
      icon: <Utensils className="h-10 w-10 text-primary" />,
      title: "Meal Planning",
      description: "Track your nutrition, plan meals, and monitor your caloric intake.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Progress Analytics",
      description: "Visualize your fitness journey with detailed charts and analytics.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Health Monitoring",
      description: "Keep track of vital health metrics and receive personalized insights.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Modern Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Heart className={cn(
              "h-6 w-6 transition-colors duration-300",
              scrolled ? "text-primary" : "text-primary"
            )} />
            <span className={cn(
              "text-xl font-bold tracking-tight transition-colors duration-300",
              scrolled ? "text-foreground" : "text-foreground"
            )}>
              FitTrack
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:bg-primary",
                "after:h-0.5 after:w-0 hover:after:w-full after:transition-all"
              )}
            >
              Home
            </Link>
            <Link 
              to="#features" 
              className={cn(
                "text-sm font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:bg-primary",
                "after:h-0.5 after:w-0 hover:after:w-full after:transition-all"
              )}
            >
              Features
            </Link>
            <Link 
              to="#about" 
              className={cn(
                "text-sm font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:bg-primary",
                "after:h-0.5 after:w-0 hover:after:w-full after:transition-all"
              )}
            >
              About
            </Link>
          </motion.nav>
          
          {/* Desktop Action Buttons */}
          <motion.div 
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/login">
              <Button variant="ghost" size="sm" className="rounded-full px-4">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="rounded-full px-4 shadow-sm hover:shadow-md transition-shadow">Sign Up</Button>
            </Link>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full transition-colors",
                mobileMenuOpen ? "bg-primary/10" : ""
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden border-t overflow-hidden bg-background/95 backdrop-blur-sm"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="container flex flex-col space-y-5 py-6 px-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                {['Home', 'Features', 'About'].map((item, i) => (
                  <motion.div
                    key={item}
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 }
                    }}
                  >
                    <Link 
                      to={i === 0 ? "/" : `#${item.toLowerCase()}`} 
                      className="text-lg font-medium flex items-center gap-2 px-2 py-2 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="border-t pt-4 mt-2 grid grid-cols-2 gap-3"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                >
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full">Sign Up</Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Space for fixed header */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-20 xl:py-28 bg-gradient-to-b from-background to-muted overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your Journey to a Healthier You Starts Here
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track your workouts, monitor your nutrition, and visualize your progress all in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto py-6 cursor-pointer">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto py-6 cursor-pointer">
                      Login
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="relative mx-auto aspect-video overflow-hidden rounded-xl bg-muted sm:w-full lg:order-last"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="/workout-1.jpg"
                alt="Dashboard Preview"
                className="object-cover w-full h-full"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                animate={{
                  opacity: isHovered ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Features that Empower Your Fitness Journey
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to track, analyze, and improve your health and fitness.
              </p>
            </motion.div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="mx-auto aspect-video overflow-hidden rounded-xl bg-muted sm:w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img
                src="/workout-2.jpg"
                alt="Features Preview"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About FitTrack
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                We created FitTrack with a simple mission: make fitness tracking accessible, intuitive, and motivating for everyone.
              </p>
              <p className="text-muted-foreground">
                Our team of fitness enthusiasts and developers combined their passion for health and technology to build a platform that helps you achieve your fitness goals, whatever they may be.
              </p>
              <p className="text-muted-foreground">
                Whether you're just starting your fitness journey or you're a seasoned athlete, FitTrack provides the tools you need to track progress, stay motivated, and achieve results.
              </p>
            </motion.div>
            <motion.div
              className="mx-auto aspect-video overflow-hidden rounded-xl bg-muted sm:w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img
                src="/workout-3.jpg"
                alt="About FitTrack"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2 items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mx-auto">
                Join thousands of users who have already improved their health and fitness with our platform.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup">
                <Button size="lg" className="w-full min-[400px]:w-auto py-6 cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">FitTrack</span>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
