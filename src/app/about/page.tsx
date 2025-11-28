import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Retro Handheld Game Consoles",
  description:
    "Learn about our mission to help you find the best retro handheld game consoles. We provide expert reviews, comparisons, and buying guides.",
  alternates: {
    canonical: "https://retrohandheldconsoles.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
        
        <div className="prose max-w-none bg-white rounded-xl p-8 shadow-lg">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to RetroHandheld, your trusted source for the best retro handheld game consoles. 
            We're passionate about helping gamers of all ages discover the perfect portable gaming device 
            that brings back the nostalgia of classic gaming while offering modern convenience and features.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Our mission is to simplify your search for the perfect retro handheld game console. 
            We carefully review and compare products, analyze customer feedback, and provide detailed 
            information to help you make an informed purchasing decision.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Do</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Review and compare retro handheld game consoles</li>
            <li>Provide detailed product specifications and features</li>
            <li>Analyze customer reviews and ratings</li>
            <li>Compare prices across different retailers</li>
            <li>Offer buying guides and recommendations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-6">
            We are committed to providing honest, unbiased reviews and recommendations. 
            While we may earn a commission from purchases made through our affiliate links, 
            this does not influence our product reviews or recommendations. Our goal is to 
            help you find the best retro handheld game console that meets your needs and budget.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have questions or suggestions? We'd love to hear from you! 
            Please visit our <a href="/contact" className="text-blue-600 hover:underline">contact page</a> to get in touch.
          </p>
        </div>
      </div>
    </div>
  );
}

