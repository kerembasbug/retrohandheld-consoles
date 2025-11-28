import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Retro Handheld Game Consoles",
  description:
    "Get in touch with us for questions, suggestions, or feedback about retro handheld game consoles.",
  alternates: {
    canonical: "https://retrohandheldconsoles.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <p className="text-lg text-gray-700 mb-6">
            We'd love to hear from you! Whether you have questions about our reviews, 
            suggestions for new products to feature, or feedback on our site, please don't hesitate to reach out.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">General Inquiries</h2>
              <p className="text-gray-700">
                For general questions or feedback, please email us at:{" "}
                <a href="mailto:info@retrohandheldconsoles.com" className="text-blue-600 hover:underline">
                  info@retrohandheldconsoles.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Suggestions</h2>
              <p className="text-gray-700">
                Know of a great retro handheld console we should review? Let us know at:{" "}
                <a href="mailto:products@retrohandheldconsoles.com" className="text-blue-600 hover:underline">
                  products@retrohandheldconsoles.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Partnerships</h2>
              <p className="text-gray-700">
                Interested in partnering with us? Contact us at:{" "}
                <a href="mailto:partners@retrohandheldconsoles.com" className="text-blue-600 hover:underline">
                  partners@retrohandheldconsoles.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> We typically respond to all inquiries within 24-48 hours. 
              Thank you for your patience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

