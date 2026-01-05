"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Search,
  MessageCircle,
  BookOpen,
  Mail,
  Phone,
  Video,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SupportPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4 md:p-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Help & Support
            </h1>
            <p className="text-sm text-muted-foreground">
              Get help and learn how to use WalkieCheck
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">
                        Chat with our support team
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Send us an email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse our guides
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                      <Video className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Video Tutorials</h3>
                      <p className="text-sm text-muted-foreground">
                        Watch how-to videos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>
                      Find answers to common questions about WalkieCheck
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search FAQs..."
                        className="pl-9"
                      />
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          How do I add new walkie talkies to my inventory?
                        </AccordionTrigger>
                        <AccordionContent>
                          To add new walkie talkies, go to the Inventory page
                          and click "Add Walkie Talkie" button. Enter the serial
                          number and label for each device. You can add multiple
                          devices at once by using the bulk import feature.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          How do I assign equipment to crew members?
                        </AccordionTrigger>
                        <AccordionContent>
                          Navigate to the Assignments page and click "New
                          Assignment". Select the walkie talkie, choose the
                          project and department, then select the crew member.
                          Set the return date and click "Assign". The crew
                          member will be notified via email.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          Can I track the history of a walkie talkie?
                        </AccordionTrigger>
                        <AccordionContent>
                          Yes! Click on any walkie talkie in your inventory to
                          view its complete movement history. You'll see all
                          assignments, departments it's been through, crew
                          members who have used it, and dates for each movement.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          What happens when equipment is overdue?
                        </AccordionTrigger>
                        <AccordionContent>
                          When a walkie talkie passes its return date, it's
                          automatically marked as "Overdue" in the Assignments
                          page. Both you and the crew member will receive email
                          reminders. You can also set up custom notification
                          preferences in Settings.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-5">
                        <AccordionTrigger>
                          How do I invite team members to collaborate?
                        </AccordionTrigger>
                        <AccordionContent>
                          Go to Team & Collaborators page and click "Invite
                          Member". Enter their email address and select their
                          role (Admin or Collaborator). They'll receive an
                          invitation email with instructions to join your
                          workspace.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-6">
                        <AccordionTrigger>
                          What's the difference between the Indie and Pro plans?
                        </AccordionTrigger>
                        <AccordionContent>
                          The Indie plan ($4.99/month) allows unlimited walkie
                          talkies but is limited to 1 project and no
                          collaborators. The Pro plan ($9.99/month) includes
                          unlimited projects, team collaboration features,
                          advanced analytics, and priority support.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-7">
                        <AccordionTrigger>
                          Can I export my inventory data?
                        </AccordionTrigger>
                        <AccordionContent>
                          Yes, Pro plan users can export inventory data,
                          assignment history, and reports in CSV or PDF format.
                          Go to the Reports page and click "Export Data" to
                          download your information.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-8">
                        <AccordionTrigger>
                          How do I mark a walkie talkie as faulty?
                        </AccordionTrigger>
                        <AccordionContent>
                          In the Inventory page, click the menu icon next to the
                          walkie talkie and select "Mark as Faulty". You can add
                          notes about the issue. Faulty devices are
                          automatically excluded from available equipment and
                          can be tracked separately for repair or replacement.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send us a Message</CardTitle>
                      <CardDescription>
                        Fill out the form and we'll get back to you within 24
                        hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue or question..."
                          rows={6}
                        />
                      </div>

                      <Button className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                          Other ways to reach us
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">
                              support@walkiecheck.com
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">
                              +1 (555) 123-4567
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Monday - Friday, 9am - 6pm EST
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                            <MessageCircle className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Live Chat</p>
                            <p className="text-sm text-muted-foreground">
                              Available 24/7 for Pro users
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Response Time</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Free Trial</span>
                          <span className="text-sm font-medium">48 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Indie Plan</span>
                          <span className="text-sm font-medium">24 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pro Plan</span>
                          <span className="text-sm font-medium text-primary">
                            4 hours
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started</CardTitle>
                      <CardDescription>
                        Learn the basics of WalkieCheck
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Quick Start Guide</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Video Tutorial Series
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Setting Up Your First Project
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Features</CardTitle>
                      <CardDescription>
                        Master WalkieCheck's powerful tools
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Managing Multiple Projects
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Team Collaboration Best Practices
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Reports & Analytics
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Best Practices</CardTitle>
                      <CardDescription>
                        Tips from experienced users
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Equipment Labeling Tips
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Tracking Overdue Returns
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">
                            Maintenance Schedules
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Community</CardTitle>
                      <CardDescription>
                        Connect with other users
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MessageCircle className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Community Forum</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Webinars & Events</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>

                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Case Studies</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
