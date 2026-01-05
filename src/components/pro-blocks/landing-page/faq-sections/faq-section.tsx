"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function FaqSection() {
  return (
    <section
      className="bg-background section-padding-y border-b"
      aria-labelledby="faq-heading"
      id="faq"
    >
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left Column */}
          <div className="section-title-gap-lg flex flex-1 flex-col">
            {/* Category Tag */}
            <Tagline>FAQ</Tagline>
            {/* Main Title */}
            <h1 id="faq-heading" className="heading-lg text-foreground">
              Find answers to our frequently asked questions
            </h1>
            {/* Section Description */}
            <p className="text-muted-foreground">
              We&apos;ve compiled the most important information to help you get
              the most out of WalkieCheck. Can&apos;t find what you&apos;re
              looking for?{" "}
              <Link href="#" className="text-primary underline">
                Contact us.
              </Link>
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-1 flex-col gap-8">
            {/* General FAQ Section */}
            <div className="flex flex-col gap-2">
              {/* Section Title */}
              <h2 className="text-foreground text-lg font-semibold md:text-xl">
                General
              </h2>
              {/* FAQ Accordion */}
              <Accordion
                type="single"
                collapsible
                aria-label="General FAQ items"
              >
                {/* FAQ Item 1 */}
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    How does WalkieCheck help me track walkie talkies?
                  </AccordionTrigger>
                  <AccordionContent>
                    WalkieCheck lets you create projects for each film
                    production, add your walkie talkie inventory with serial
                    numbers and labels, then assign them to departments and crew
                    members. You can instantly search any device by serial
                    number or label to see who has it, which department they're
                    in, when it's due back, and view its complete movement
                    history through all departments.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 2 */}
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Can I track faulty or broken walkie talkies?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! WalkieCheck includes status tracking for all equipment.
                    You can mark devices as available, occupied, or faulty. When
                    a walkie talkie breaks or malfunctions, simply update its
                    status to "faulty" and the system will track it separately,
                    helping you manage replacements and repairs while
                    maintaining a complete history.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 3 */}
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    What happens when a walkie talkie moves between departments?
                  </AccordionTrigger>
                  <AccordionContent>
                    Every time you reassign a walkie talkie to a different
                    department or crew member, WalkieCheck automatically logs
                    this movement. The system maintains a complete trail showing
                    every department the device has been in, who had it, and
                    when. This creates full accountability and makes it easy to
                    trace equipment history throughout the production.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 4 */}
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Can I manage multiple film productions at once?
                  </AccordionTrigger>
                  <AccordionContent>
                    With the Pro plan, you can manage unlimited projects
                    simultaneously. Each project (film production) has its own
                    departments, crew members, and walkie talkie inventory. This
                    is perfect for assistant directors working on multiple
                    productions or production companies managing several films
                    at the same time. The Free Trial and Indie plans are limited
                    to one project.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Billing FAQ Section */}
            <div className="flex flex-col gap-2">
              {/* Section Title */}
              <h2 className="text-foreground text-lg font-semibold md:text-xl">
                Billing
              </h2>
              {/* FAQ Accordion */}
              <Accordion
                type="single"
                collapsible
                aria-label="Billing FAQ items"
              >
                {/* FAQ Item 1 */}
                <AccordionItem value="billing-1">
                  <AccordionTrigger className="text-left">
                    How does the 14-day free trial work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our free trial gives you 14 days to test WalkieCheck with up
                    to 50 walkie talkies and 1 project. No credit card required
                    to start. You'll have access to all core tracking features
                    including real-time location, movement history, and status
                    management. After 14 days, you can choose to upgrade to
                    Indie or Pro plans to continue using the app.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 2 */}
                <AccordionItem value="billing-2">
                  <AccordionTrigger className="text-left">
                    What's the difference between Indie and Pro plans?
                  </AccordionTrigger>
                  <AccordionContent>
                    The Indie plan ($4.99 CAD/month) is perfect for single
                    productions with unlimited walkie talkies but limited to 1
                    project and no team collaborators. The Pro plan ($9.99
                    CAD/month) is designed for professional ADs managing
                    multiple productions, offering unlimited projects, team
                    collaboration features, advanced analytics, and priority
                    support.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 3 */}
                <AccordionItem value="billing-3">
                  <AccordionTrigger className="text-left">
                    Can I cancel or change my plan anytime?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you have full flexibility to upgrade, downgrade, or
                    cancel your subscription at any time with no cancellation
                    fees. If you upgrade mid-cycle, you'll get immediate access
                    to new features with prorated billing. If you cancel, you'll
                    retain access until the end of your current billing period.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 4 */}
                <AccordionItem value="billing-4">
                  <AccordionTrigger className="text-left">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American
                    Express) and PayPal. All payments are processed securely
                    through Stripe. Prices are in Canadian Dollars (CAD). For
                    production companies requiring invoicing or net payment
                    terms, please contact us directly.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
