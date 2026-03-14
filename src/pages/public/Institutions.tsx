import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

export default function Institutions() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter) {
      setActiveTab(filter);
    }
  }, [location]);

  const institutions = [
    {
      id: 'college',
      name: 'Degree College',
      type: 'Higher Education',
      image: 'https://picsum.photos/seed/college_main/800/600',
      description: 'Our Degree College offers a wide range of undergraduate and postgraduate programs designed to equip students with the knowledge and skills needed for successful careers.',
      features: ['B.A., B.Sc., B.Com', 'M.A., M.Sc., M.Com', 'Modern Laboratories', 'Extensive Library', 'Placement Cell'],
      icon: <GraduationCap className="h-8 w-8 text-indigo-600" />
    },
    {
      id: 'english',
      name: 'English Medium School',
      type: 'Primary & Secondary',
      image: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/487346299_9582474108481652_4398648609972565475_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2a1932&_nc_ohc=yS0YjfWvNZcQ7kNvwGfNruU&_nc_oc=Adk50Jzl9_fAHFRjSyDjrgEkvyYcNsZ_Zk-IIf6o8NgA_q09fNB-nonLnP88rxGSgW8&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=v5aHVzsixTVVDi7GnlxgOQ&_nc_ss=8&oh=00_AfznI9F_ETIcetP7BlItb2BktphGRLJDVk7Syff0rkFRPQ&oe=69BAEBC3',
      description: 'The English Medium School focuses on providing a strong foundation from Nursery to Class 10, emphasizing fluency in English and a modern pedagogical approach.',
      features: ['Nursery to Class 10', 'Smart Classrooms', 'Computer Labs', 'Sports Complex', 'Extracurricular Activities'],
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />
    },
    {
      id: 'hindi',
      name: 'Hindi Medium School',
      type: 'Primary to Higher Secondary',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFn2CkpX4Iadb6caW49LuB3ye257Il-yxpg&s',
      description: 'Our Hindi Medium School offers education from Class 1 to 12, combining academic rigor with deep cultural roots and values.',
      features: ['Class 1 to 12', 'Science & Arts Streams (11-12)', 'Experienced Faculty', 'Cultural Programs', 'Value Education'],
      icon: <Users className="h-8 w-8 text-indigo-600" />
    }
  ];

  const filteredInstitutions = activeTab === 'all' 
    ? institutions 
    : institutions.filter(inst => inst.id === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">Our Institutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect educational environment for every stage of learning.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'all' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
            }`}
          >
            All Institutions
          </button>
          <button
            onClick={() => setActiveTab('college')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'college' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
            }`}
          >
            Degree College
          </button>
          <button
            onClick={() => setActiveTab('english')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'english' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
            }`}
          >
            English Medium School
          </button>
          <button
            onClick={() => setActiveTab('hindi')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'hindi' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
            }`}
          >
            Hindi Medium School
          </button>
        </div>

        {/* Institution Cards */}
        <div className="space-y-16">
          {filteredInstitutions.map((inst, index) => (
            <div key={inst.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img 
                    src={inst.image} 
                    alt={inst.name} 
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    {inst.icon}
                    <span className="ml-3 font-bold text-gray-900">{inst.type}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{inst.name}</h2>
                <div className="w-20 h-1 bg-indigo-600 mb-6"></div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {inst.description}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features & Offerings</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                  {inst.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                  View Admission Details
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
