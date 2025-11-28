import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure - Retro Handheld Game Consoles",
  description: "Affiliate disclosure for RetroHandheld.com",
  alternates: {
    canonical: "https://retrohandheldconsoles.com/affiliate-disclosure",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Affiliate Disclosure</h1>
        
        <div className="prose max-w-none bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Amazon Associates Program</h2>
          <p className="text-gray-700 mb-6">
            RetroHandheld.com is a participant in the Amazon Services LLC Associates Program, an affiliate 
            advertising program designed to provide a means for websites to earn advertising fees by advertising 
            and linking to Amazon.com and affiliated sites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
          <p className="text-gray-700 mb-6">
            When you click on a product link on our website and make a purchase on Amazon, we may receive 
            a small commission at no additional cost to you. This commission helps us maintain and improve 
            our website, continue providing quality content, and keep our reviews and comparisons free for users.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-6">
            It's important to note that:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>We only recommend products we believe are valuable and relevant to our readers</li>
            <li>Our reviews and recommendations are based on research, analysis, and customer feedback</li>
            <li>The affiliate relationship does not influence our product reviews or ratings</li>
            <li>Product prices and availability are determined by Amazon, not by us</li>
            <li>You pay the same price whether you use our affiliate links or go directly to Amazon</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Transparency</h2>
          <p className="text-gray-700 mb-6">
            We believe in full transparency with our readers. All affiliate links are clearly marked, 
            and this disclosure page provides complete information about our affiliate relationships.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Questions</h2>
          <p className="text-gray-700">
            If you have any questions about our affiliate relationships or disclosure, please contact us at:{" "}
            <a href="mailto:info@retrohandheldconsoles.com" className="text-blue-600 hover:underline">
              info@retrohandheldconsoles.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

