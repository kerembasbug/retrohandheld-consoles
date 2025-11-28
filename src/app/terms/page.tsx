import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Retro Handheld Game Consoles",
  description: "Terms of service for RetroHandheld.com",
  alternates: {
    canonical: "https://retrohandheldconsoles.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none bg-white rounded-xl p-8 shadow-lg">
          <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using RetroHandheld.com, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use License</h2>
          <p className="text-gray-700 mb-6">
            Permission is granted to temporarily access the materials on RetroHandheld.com for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Affiliate Disclosure</h2>
          <p className="text-gray-700 mb-6">
            RetroHandheld.com is a participant in the Amazon Services LLC Associates Program, an affiliate 
            advertising program designed to provide a means for sites to earn advertising fees by advertising 
            and linking to Amazon.com. We may earn a commission from qualifying purchases made through our links.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Product Information</h2>
          <p className="text-gray-700 mb-6">
            We strive to provide accurate product information, prices, and availability. However, we cannot 
            guarantee that all information is complete, current, or error-free. Product prices and availability 
            are subject to change without notice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitations</h2>
          <p className="text-gray-700 mb-6">
            In no event shall RetroHandheld or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
            to use the materials on RetroHandheld.com.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Revisions</h2>
          <p className="text-gray-700 mb-6">
            RetroHandheld may revise these terms of service at any time without notice. By using this website, 
            you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us at:{" "}
            <a href="mailto:legal@retrohandheldconsoles.com" className="text-blue-600 hover:underline">
              legal@retrohandheldconsoles.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

