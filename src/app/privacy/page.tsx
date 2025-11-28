import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Retro Handheld Game Consoles",
  description: "Privacy policy for RetroHandheld.com",
  alternates: {
    canonical: "https://retrohandheldconsoles.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none bg-white rounded-xl p-8 shadow-lg">
          <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            At RetroHandheld, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Information you provide when contacting us</li>
            <li>Usage data and analytics through cookies and similar technologies</li>
            <li>IP address and browser information</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Improve our website and user experience</li>
            <li>Respond to your inquiries and requests</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            You can control cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 mb-6">
            Our website may contain links to third-party websites, including Amazon. We are not responsible 
            for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-6">
            You have the right to access, update, or delete your personal information. 
            If you have any questions or concerns about your privacy, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:privacy@retrohandheldconsoles.com" className="text-blue-600 hover:underline">
              privacy@retrohandheldconsoles.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

