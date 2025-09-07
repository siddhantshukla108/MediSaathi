import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { Calendar, Video, ShoppingCart, Stethoscope, ArrowRight } from "lucide-react";

export default function Home() {
  // Sample data for different sections
  const healthCategories = [
    { name: "General Physician", icon: "👨‍⚕️" },
    { name: "Skin & Hair", icon: "💆" },
    { name: "Women's Health", icon: "👩" },
    { name: "Dental Care", icon: "🦷" },
    { name: "Child Specialist", icon: "👶" },
    { name: "Ear, Nose, Throat", icon: "👂" },
    { name: "Mental Wellness", icon: "🧠" },
    { name: "More...", icon: "➕" },
  ];

  const featuredServices = [
    { name: "Piles", icon: "⭐" },
    { name: "Pregnancy", icon: "🤰" },
    { name: "Knee Replacement", icon: "🦵" },
  ];

  const offers = [
    {
      title: "practo-DENTAL CLINICS",
      description: "Best-quality treatments using advanced techniques",
    },
    {
      title: "cocencil",
      description: "India's Only Health Checkup to Catch Cancer & Heart Blockage Early",
      features: [
        "Check heart blockage with CT",
        "Early Cancer detection with MRI",
        "DEXA Scan for Metabolic Risk",
        "I20 + blood and urine tests"
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Sticky Header with chatbot */}
        <Header />

        {/* Page Content */}
        <main className="pt-20 pb-16 max-w-7xl mx-auto px-4">
          {/* Appointment Type Selection */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <span className="font-medium text-blue-800">Physical Appointment</span>
                <span className="text-sm text-gray-600">At Hospital</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg bg-green-50 border border-green-100">
                <Video className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-medium text-green-800">Instant Video Consult</span>
                <span className="text-sm text-gray-600">Connect in 5 sec</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg bg-purple-50 border border-purple-100">
                <ShoppingCart className="h-8 w-8 text-purple-600 mb-2" />
                <span className="font-medium text-purple-800">Medicines</span>
                <span className="text-sm text-gray-600">& Lab Tests</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg bg-red-50 border border-red-100">
                <Stethoscope className="h-8 w-8 text-red-600 mb-2" />
                <span className="font-medium text-red-800">Surgeries</span>
                <span className="text-sm text-gray-600">Book procedures</span>
              </button>
            </div>
          </div>

          {/* Health Categories */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Find a Doctor for your Health Problem</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {healthCategories.map((category, index) => (
                <div key={index} className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <span className="text-xs text-center font-medium text-gray-700">{category.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Services */}
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Affordable Procedures by Expert Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {featuredServices.map((service, index) => (
                <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                  <span className="text-2xl mb-2">{service.icon}</span>
                  <span className="font-medium text-gray-800">{service.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button className="text-blue-600 font-medium flex items-center">
                More <ArrowRight className="h-4 w-4 ml-1" />
              </button>
              <p className="text-sm text-gray-600">All insurances accepted & No Cost EMI available</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Cost Estimate
              </button>
            </div>
          </section>

          {/* Offers Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Best Offers</h2>
            <p className="text-gray-600 mb-6">Explore deals, offers, health updates and more</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="mb-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">LAUNCHING NEAR YOU</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  
                  {offer.features && (
                    <ul className="mb-4 space-y-2">
                      {offer.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <button className="py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    BOOK APPOINTMENT
                  </button>
                  {index === 0 && <p className="text-xs text-gray-500 mt-2">*136 Apply</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Surgery Promotion */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white mb-8">
            <h2 className="text-xl font-bold mb-2">Safe and Secure surgeries</h2>
            <p className="mb-4">Get your first consultation FREE</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Reclaim mobility with Total Knee Replacement</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-white text-blue-600 rounded-full h-6 w-6 flex items-center justify-center mr-2">1</span>
                  Minimally Invasive Procedure
                </li>
                <li className="flex items-center">
                  <span className="bg-white text-blue-600 rounded-full h-6 w-6 flex items-center justify-center mr-2">2</span>
                  Early Discharge & Quick Recovery
                </li>
              </ul>
            </div>
            
            <button className="py-3 px-6 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Book Appointment
            </button>
          </section>

          {/* Community Stats */}
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Our community of doctors and patients drive us to create technologies for better and affordable healthcare</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">30 Cr+</div>
                <div className="text-gray-600">Our Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1 Lakh+</div>
                <div className="text-gray-600">Our Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">20,000+</div>
                <div className="text-gray-600">Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">40 Lakh+</div>
                <div className="text-gray-600">Patient Stories</div>
              </div>
            </div>
          </section>

          {/* Ask Care AI */}
          <section className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-sm p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Ask Care AI FREE</h2>
            <p className="mb-4">20000+ health queries resolved in last month</p>
            <button className="py-3 px-6 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Ask a Free Question
            </button>
          </section>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}