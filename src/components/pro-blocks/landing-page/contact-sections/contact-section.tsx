"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function ContactSection() {
  return (
    <section
      className="bg-secondary section-padding-y border-b"
      aria-labelledby="contact-heading"
      id="contact"
    >
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="section-title-gap-lg flex flex-1 flex-col">
            {/* Category Tag */}
            <Tagline>Contact</Tagline>
            {/* Main Title */}
            <h2 id="contact-heading" className="heading-lg text-foreground">
              Get in touch with us
            </h2>
            {/* Section Description */}
            <p className="text-muted-foreground">
              Have questions about WalkieCheck? Need help setting up your
              production? We&apos;re here to help assistant directors get the
              most out of their equipment tracking.
            </p>

            {/* Contact Methods */}
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground font-semibold">Email us</h3>
                  <p className="text-muted-foreground text-sm">
                    support@walkiecheck.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
                  <MessageSquare className="text-primary h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground font-semibold">
                    Response time
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)]">
                  <HelpCircle className="text-primary h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground font-semibold">
                    Support hours
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Friday, 9am - 6pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-1 flex-col">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input id="name" type="text" placeholder="Your name" required />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="production"
                  className="text-sm font-medium text-foreground"
                >
                  Production/Company (Optional)
                </label>
                <Input
                  id="production"
                  type="text"
                  placeholder="Your production or company name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send message
              </Button>

              <p className="text-muted-foreground text-xs text-center">
                By submitting this form, you agree to our privacy policy and
                terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
