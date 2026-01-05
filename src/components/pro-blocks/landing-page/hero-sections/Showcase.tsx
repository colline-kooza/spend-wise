import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Play,
} from "lucide-react";

export default function PremiumButtonShowcase() {
  return (
    <div className="min-h-screen bg-grid-radial">
      {/* Hero Section */}
      <section className="container-padding-x section-padding-y">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Sparkles className="size-4" />
              Premium Components
            </div>
            <h1 className="heading-xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Eye-Catching Buttons
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium button components with stunning visual effects, inspired
              by Apple and modern web design
            </p>
          </div>

          {/* Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="premium" size="xl">
              <Rocket />
              Start tracking free
            </Button>
            <Button variant="magnetic" size="xl">
              See how it works
              <ArrowRight />
            </Button>
          </div>

          {/* Premium Variants */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
            {/* Premium Gradient with Glow */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-layer gradient with animated shine sweep and glow effect
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex flex-col items-center gap-4">
                <Button variant="premium" size="xl">
                  <Zap />
                  Get Started Now
                </Button>
                <Button variant="premium" size="lg">
                  Start Your Journey
                  <ArrowRight />
                </Button>
                <Button variant="premium" size="default">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Glass Morphism */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Glass</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful glassmorphism effect with backdrop blur
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 via-pink/20 to-purple-500/20 rounded-2xl p-8 border border-white/20 flex flex-col items-center gap-4">
                <Button variant="glass" size="xl">
                  <Sparkles />
                  Explore Features
                </Button>
                <Button variant="glass" size="lg">
                  View Gallery
                  <ArrowRight />
                </Button>
                <Button variant="glass" size="default">
                  Discover More
                </Button>
              </div>
            </div>

            {/* Neon Glow */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Neon</h3>
                <p className="text-sm text-muted-foreground">
                  Vibrant neon glow with pulsing animation
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col items-center gap-4">
                <Button variant="neon" size="xl">
                  <Zap />
                  Join Waitlist
                </Button>
                <Button variant="neon" size="lg">
                  Get Early Access
                  <ArrowRight />
                </Button>
                <Button variant="neon" size="default">
                  Sign Up Free
                </Button>
              </div>
            </div>

            {/* Magnetic */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Magnetic</h3>
                <p className="text-sm text-muted-foreground">
                  Lifts up on hover with enhanced scale and glow
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex flex-col items-center gap-4">
                <Button variant="magnetic" size="xl">
                  <Play />
                  Watch Demo
                </Button>
                <Button variant="magnetic" size="lg">
                  Try It Free
                  <ArrowRight />
                </Button>
                <Button variant="magnetic" size="default">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Shimmer */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Shimmer</h3>
                <p className="text-sm text-muted-foreground">
                  Continuous shimmer animation across the button
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex flex-col items-center gap-4">
                <Button variant="shimmer" size="xl">
                  <Star />
                  Featured Plan
                </Button>
                <Button variant="shimmer" size="lg">
                  Premium Access
                  <ArrowRight />
                </Button>
                <Button variant="shimmer" size="default">
                  Upgrade Now
                </Button>
              </div>
            </div>

            {/* 3D Elevated */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Elevated</h3>
                <p className="text-sm text-muted-foreground">
                  3D button that lifts and presses with realistic shadows
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex flex-col items-center gap-4">
                <Button variant="elevated" size="xl">
                  <Download />
                  Download App
                </Button>
                <Button variant="elevated" size="lg">
                  Install Now
                  <ArrowRight />
                </Button>
                <Button variant="elevated" size="default">
                  Get Desktop App
                </Button>
              </div>
            </div>

            {/* Soft Glow */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Glow</h3>
                <p className="text-sm text-muted-foreground">
                  Soft glow effect that intensifies on hover
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex flex-col items-center gap-4">
                <Button variant="glow" size="xl">
                  <Sparkles />
                  Special Offer
                </Button>
                <Button variant="glow" size="lg">
                  Limited Time
                  <ArrowRight />
                </Button>
                <Button variant="glow" size="default">
                  Claim Now
                </Button>
              </div>
            </div>

            {/* Aurora */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Aurora</h3>
                <p className="text-sm text-muted-foreground">
                  Animated multi-color gradient like northern lights
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col items-center gap-4">
                <Button variant="aurora" size="xl">
                  <Sparkles />
                  Magic Button
                </Button>
                <Button variant="aurora" size="lg">
                  Experience Magic
                  <ArrowRight />
                </Button>
                <Button variant="aurora" size="default">
                  Try Magic
                </Button>
              </div>
            </div>

            {/* Outline Fill */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Outline Fill</h3>
                <p className="text-sm text-muted-foreground">
                  Outline that fills with color on hover
                </p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex flex-col items-center gap-4">
                <Button variant="outlineFill" size="xl">
                  <Rocket />
                  Secondary Action
                </Button>
                <Button variant="outlineFill" size="lg">
                  Learn More
                  <ArrowRight />
                </Button>
                <Button variant="outlineFill" size="default">
                  View Details
                </Button>
              </div>
            </div>

            {/* Holographic */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="heading-sm">Holographic</h3>
                <p className="text-sm text-muted-foreground">
                  Futuristic holographic gradient with shine effect
                </p>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col items-center gap-4">
                <Button variant="holographic" size="xl">
                  <Zap />
                  Future Tech
                </Button>
                <Button variant="holographic" size="lg">
                  Next Generation
                  <ArrowRight />
                </Button>
                <Button variant="holographic" size="default">
                  Explore Future
                </Button>
              </div>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-8 mt-20">
            <div className="text-center space-y-2">
              <h2 className="heading-md">Icon Buttons</h2>
              <p className="text-muted-foreground">
                Perfect for actions and controls
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="premium" size="icon">
                <Star />
              </Button>
              <Button variant="glass" size="icon">
                <Download />
              </Button>
              <Button variant="neon" size="icon">
                <Zap />
              </Button>
              <Button variant="magnetic" size="icon">
                <Play />
              </Button>
              <Button variant="shimmer" size="icon">
                <Sparkles />
              </Button>
              <Button variant="elevated" size="icon">
                <Rocket />
              </Button>
              <Button variant="glow" size="icon">
                <Star />
              </Button>
              <Button variant="aurora" size="icon">
                <Sparkles />
              </Button>
            </div>
          </div>

          {/* Real World Examples */}
          <div className="space-y-8 mt-20">
            <div className="text-center space-y-2">
              <h2 className="heading-md">Real World Usage</h2>
              <p className="text-muted-foreground">
                Common button combinations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hero CTA */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-border space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Hero Section CTA</h4>
                  <p className="text-sm text-muted-foreground">
                    Primary and secondary actions
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="premium" size="lg">
                    Get Started Free
                    <ArrowRight />
                  </Button>
                  <Button variant="glass" size="lg">
                    Watch Demo
                    <Play />
                  </Button>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-border space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Pricing Card</h4>
                  <p className="text-sm text-muted-foreground">
                    Featured plan button
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="shimmer" size="lg" className="w-full">
                    <Star />
                    Choose Premium
                  </Button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-border space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Form Submission</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit with style
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="magnetic" size="lg">
                    Submit Application
                    <ArrowRight />
                  </Button>
                  <Button variant="outlineFill" size="lg">
                    Save Draft
                  </Button>
                </div>
              </div>

              {/* Special Promotion */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg text-white">
                    Limited Offer
                  </h4>
                  <p className="text-sm text-slate-300">
                    Eye-catching promotion
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="neon" size="lg">
                    <Zap />
                    Claim 50% OFF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
