import {
  BookOpen,
  Briefcase,
  FileText,
  LifeBuoy,
  List,
  Mail,
  PenTool,
  Users,
} from "lucide-react";
import React from "react";

export default function ResourcesMenu() {
  return (
    <div className="grid w-full grid-cols-12 gap-8">
      {/* Explore Section */}
      <div className="col-span-5">
        <h4 className="mb-4 pl-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Explore
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="#"
            className="flex h-40 flex-col justify-between rounded-xl border border-gray-100 p-4 transition-all hover:border-gray-200 hover:bg-gray-50"
          >
            <div className="h-8 w-8 text-gray-600">
              <LifeBuoy size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Help Center
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Answers to your questions
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex h-40 flex-col justify-between rounded-xl border border-gray-100 p-4 transition-all hover:border-gray-200 hover:bg-gray-50"
          >
            <div className="h-8 w-8 text-gray-600">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Docs</h3>
              <p className="mt-1 text-xs text-gray-500">
                Platform documentation
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Company Section */}
      <div className="col-span-3">
        <h4 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Company
        </h4>
        <ul className="space-y-2">
          <li>
            <a
              href="/about"
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <Users
                size={18}
                className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-900"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700 group-hover:text-black">
                  About
                </span>
                <span className="block text-xs text-gray-500">
                  Company, values, and team
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <Briefcase
                size={18}
                className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-900"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700 group-hover:text-black">
                  Careers
                </span>
                <span className="block text-xs text-gray-500">
                  Join our global, remote team
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/brand"
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <FileText
                size={18}
                className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-900"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700 group-hover:text-black">
                  Brand Guidelines
                </span>
                <span className="block text-xs text-gray-500">
                  Logos, wordmark, etc.
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <Mail
                size={18}
                className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-900"
              />
              <div>
                <span className="block text-sm font-medium text-gray-700 group-hover:text-black">
                  Contact
                </span>
                <span className="block text-xs text-gray-500">
                  Reach out to support
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      {/* Updates Section */}
      <div className="col-span-4 border-l border-gray-100 pl-8">
        <h4 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Updates
        </h4>
        <ul className="space-y-4">
          <li>
            <a href="/blog-new" className="group flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-transparent bg-gray-50 text-gray-500 transition-all group-hover:border-gray-100 group-hover:bg-white group-hover:shadow-sm">
                <PenTool size={16} />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                  Blog
                </span>
                <span className="block text-xs text-gray-500">
                  Insights and stories
                </span>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="group flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-transparent bg-gray-50 text-gray-500 transition-all group-hover:border-gray-100 group-hover:bg-white group-hover:shadow-sm">
                <List size={16} />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                  Changelog
                </span>
                <span className="block text-xs text-gray-500">
                  Releases and updates
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
