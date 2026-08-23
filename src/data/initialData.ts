import cert1Pic from "../assets/cert-1.png";
import profilePic from "../assets/photo-1.png";
import cert2Img from '../assets/cert-2.png';
import waterTapImg from '../assets/water-tap-mockup.png';
import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Sulaiman Khan",
    title: "Mechanical Engineer | Mechanical CAD Designer",
    tagline: "Designing the future through innovation, precision, and mechanical excellence.",
    photo: profilePic,
    about: "I am a passionate Mechanical Engineering student with a strong foundation in CAD design, manufacturing processes, and engineering principles. I thrive on solving complex problems and turning innovative ideas into tangible solutions.",
    careerObjective: "To secure a challenging position in a reputable organization where I can expand my learnings, knowledge, and skills, while making a significant contribution to the success of the company.",
    summary: "Detail-oriented mechanical engineering student with hands-on experience in CAD modeling, prototyping, and engineering design. Proficient in industry-standard software and passionate about sustainable Mechanical engineering solutions.",
    interests: ["Mechanical Design", "CAD Modeling", "Manufacturing", "Robotics", "Sustainable Mechanical Engineering", "Product Development"],
    location: "Peshawar, Pakistan",
    email: "sulaimankhan9540@gmail.com",
    phone: "+923179540566",
    whatsapp: "+923179540566",
    linkedin: "www.linkedin.com/in/sulaiman-khann",
    github: "",
    portfolio: "",
    otherLinks: [],
    dateOfBirth: "",
  },
  education: [
    {
      id: "edu-1",
      degree: "BSc Mechanical Engineering",
      field: "Mechanical Engineering",
      institution: "University of Engineering & Technology, Peshawar",
      startYear: "2023",
      endYear: "2027",
      grade: "CGPA: 0.0/4.0",
      description: "Studying core mechanical engineering subjects including thermodynamics, fluid mechanics, materials science, and machine design.",
      logo: "",
      certificate: "",
    },
    {
      id: "edu-2",
      degree: "Higher Secondary School Certificate (HSSC)",
      field: "Pre-Engineering",
      institution: "Al-Abbas Science Degree College, D.I. Khan",
      startYear: "2021",
      endYear: "2023",
      grade: "Grade: A",
      description: "Completed pre-engineering coursework with a focus on Mathematics, Physics, and Chemistry.",
      logo: "",
      certificate: "",
    },
    {
      id: "edu-3",
      degree: "Secondary School Certificate (SSC)",
      field: "Science",
      institution: "Kundi Model School, Pai, Tank",
      startYear: "2019",
      endYear: "2021",
      grade: "Grade: A+",
      description: "Completed secondary education in science stream with focus on fundamental science subjects and mathematics.",
      logo: "",
      certificate: "",
    }
  ],
  experience: [
    {
      id: "exp-1",
      title: "Mechanical Engineering Intern",
      company: "MAK Pumps Pvt Ltd",
      employmentType: "Internship",
      location: "Peshawar, Pakistan",
      startDate: "2026-07",
      endDate: "",
      current: true,
      description: "Designing mounting structures for solar energy installations and executing structural wind analysis to optimize design safety and performance.",
      responsibilities: [
        "Designed parametric solar panel mounting structures using PTC Creo and AutoCAD",
        "Conducted wind simulation analyses to evaluate structural integrity and load resistance",
        "Collaborated with engineering teams to optimize component designs for local site conditions",
        "Prepared technical drawings and drafting documentation for manufacturing and assembly"
      ],
      skills: ["PTC Creo", "AutoCAD", "Wind Simulation", "Solar Mounting Design", "Structural Analysis"],
      certificate: "",
      images: []
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "Why Most Compressed Air Systems Underperform",
      organization: "Pumps & Systems (Sponsored by Kaishan Compressor USA)",
      date: "2026-07-23",
      category: "Technical",
      credentialId: "",
      description: "Completed technical training on analyzing compressed air system performance, efficiency losses, and optimization strategies.",
      file: cert1Pic,
      url: "",
    },
    
      {
  id: "cert-2",
  title: "From Engineering to Jet Engines: Navigating a Career in Aviation",
  organization: "ASME UET Peshawar Student Section",
  date: "2026-08",
  category: "Technical",
  credentialId: "",
  description: "Attended webinar on aviation career pathways and jet engine engineering hosted by ASME UET Peshawar.",
  file: cert2Img,
  url: "",

    }
  ],
  projects: [
   {
  id: "proj-automatic-water-tap",
  title: "Automatic Water Tap System",
  category: "Mechatronics",
  date: "2026",
  shortDescription: "Designed and prototyped a touchless, low-cost automatic water tap to reduce water wastage and improve hygiene[cite: 1].",
  detailedDescription: "Developed an automated water tap system for the Mechatronics Lab at UET Peshawar using an Arduino Uno, IR proximity sensor, and SG90 servo motor[cite: 1]. The system detects hand presence within 2–8 cm to automatically actuate the water valve in under 0.5 seconds, eliminating manual contact and curbing unnecessary water flow[cite: 1]. Includes circuit design, embedded C++ control logic, and a physical prototype assembly built for under PKR 4,000[cite: 1].",
  tools: ["Arduino", "Embedded C++", "IR Proximity Sensor", "SG90 Servo Motor", "SolidWorks", "Breadboard Circuitry"],
  role: "Mechanical & Control Systems Designer",
  images: [waterTapImg],
  videoUrl: "",
  githubUrl: "",
  liveUrl: "",
  documentation: "",
},
    {
      id: "proj-2",
      title: "Solar-Powered Water Pump",
      category: "Mechanical",
      date: "2023",
      shortDescription: "Designed a sustainable solar-powered water pump for agricultural use.",
      detailedDescription: "Developed a cost-effective solar-powered water pump system for irrigation in rural areas. The project focused on maximizing efficiency while minimizing costs.",
      tools: ["Creo", "AutoCAD", "Arduino"],
      role: "Project Engineer",
      images: [],
      videoUrl: "",
      githubUrl: "",
      liveUrl: "",
      documentation: "",
    }
  ],
  skills: [
    { id: "skill-1", name: "Creo", category: "Engineering Software" },
    { id: "skill-2", name: "AutoCAD", category: "Engineering Software" },
    { id: "skill-3", name: "SolidWorks", category: "Engineering Software" },
    { id: "skill-4", name: "Arduino", category: "Programming" },
    { id: "skill-5", name: "C/C++", category: "Programming" },
    { id: "skill-6", name: "MS Office", category: "Professional Skills" },
    { id: "skill-7", name: "CAD Modeling", category: "Engineering Software" },
    { id: "skill-8", name: "Mechanical Design", category: "Professional Skills" },
    { id: "skill-9", name: "Manufacturing", category: "Professional Skills" },
    { id: "skill-10", name: "Engineering Drawing", category: "Professional Skills" },
    { id: "skill-11", name: "Technical Communication", category: "Professional Skills" },
    { id: "skill-12", name: "Problem Solving", category: "Professional Skills" },
  ]
};