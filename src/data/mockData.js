// EduMate360 Bangladesh Education Platform Data Model

export const EDUCATION_LEVELS = [
  { id: 'early', name: 'Early Childhood', classes: ['Play Group', 'Nursery', 'KG'] },
  { id: 'primary', name: 'Primary (Class 1-5)', classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'] },
  { id: 'junior', name: 'Junior Secondary (Class 6-8)', classes: ['Class 6', 'Class 7', 'Class 8'] },
  { id: 'secondary', name: 'Secondary & SSC (Class 9-10)', classes: ['Class 9', 'Class 10', 'SSC Batch'] },
  { id: 'higher', name: 'Higher Secondary & HSC (Class 11-12)', classes: ['Class 11', 'Class 12', 'HSC Batch'] },
  { id: 'admission', name: 'Admission Preparation', classes: ['BUET / Engineering', 'Medical (MBBS)', 'DU / Varsity A Unit', 'IBA & BBA Admission'] }
];

export const ALL_CLASSES = [
  'Play Group', 'Nursery', 'KG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8',
  'Class 9', 'Class 10', 'SSC Batch',
  'Class 11', 'Class 12', 'HSC Batch',
  'BUET / Engineering', 'Medical (MBBS)', 'DU / Varsity A Unit', 'IBA & BBA Admission'
];

export const MEDIUMS = [
  { id: 'bangla', label: 'Bangla Medium (বাংলা মাধ্যম)' },
  { id: 'english-version', label: 'English Version (ইংলিশ ভার্সন - NCTB)' },
  { id: 'english-medium', label: 'English Medium (Cambridge / Edexcel)' }
];

export const DISTRICTS = [
  {
    name: 'Dhaka',
    areas: ['Mirpur', 'Dhanmondi', 'Uttara', 'Gulshan', 'Banani', 'Mohammadpur', 'Motijheel', 'Badda', 'Shantinagar', 'Lalbagh', 'Bashundhara R/A']
  },
  {
    name: 'Chattogram',
    areas: ['Panchlaish', 'Nasirabad', 'Halishahar', 'Agrabad', 'Khulshi', 'GEC Circle']
  },
  {
    name: 'Sylhet',
    areas: ['Zindabazar', 'Amberkhana', 'Subidbazar', 'Shahi Eidgah']
  },
  {
    name: 'Rajshahi',
    areas: ['Boalia', 'Motihar', 'Kazla', 'Upashahar']
  },
  {
    name: 'Khulna',
    areas: ['Sonadanga', 'Boyra', 'Khalishpur', 'Daulatpur']
  }
];

export const ALL_SUBJECTS = [
  'All Subjects (All-in-One)',
  'Bangla (বাংলা)',
  'English (ইংরেজি)',
  'General Mathematics (গণিত)',
  'Higher Mathematics (উচ্চতর গণিত)',
  'Physics (পদার্থবিজ্ঞান)',
  'Chemistry (রসায়ন)',
  'Biology (জীববিজ্ঞান)',
  'ICT (তথ্য ও যোগাযোগ প্রযুক্তি)',
  'General Science (সাধারণ বিজ্ঞান)',
  'Bangladesh & Global Studies (বিজিএস)',
  'Accounting (হিসাববিজ্ঞান)',
  'Finance & Banking (ফিন্যান্স)',
  'Business Organization (ব্যবসায় উদ্যোগ)',
  'Economics (অর্থনীতি)',
  'Admission Math & Analytical',
  'Medical Biology & Chemistry GK'
];

export const INITIAL_TUTORS = [
  {
    id: 'tut-1',
    name: 'Engr. Tanvir Ahmed',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    university: 'BUET (Electrical & Electronic Eng.)',
    degree: 'B.Sc. in EEE, BUET',
    gender: 'Male',
    verified: true,
    rating: 4.9,
    reviewsCount: 38,
    experience: '5+ Years Teaching',
    location: 'Dhaka (Mirpur, Dhanmondi, Mohammadpur)',
    preferredMediums: ['Bangla Medium', 'English Version'],
    classes: ['Class 9', 'Class 10', 'SSC Batch', 'Class 11', 'Class 12', 'HSC Batch', 'BUET / Engineering'],
    subjects: ['Physics (পদার্থবিজ্ঞান)', 'Higher Mathematics (উচ্চতর গণিত)'],
    modes: ['Home Tutor', 'Online', 'Coaching Batch'],
    monthlyFee: '৳6,000 - ৳8,000 / month',
    hourlyFee: 800,
    availability: 'Sat, Mon, Wed (5:00 PM - 9:00 PM)',
    bio: 'Experienced physics and math mentor for SSC, HSC, and engineering admission aspirants. Focuses on foundational concepts, creative questions (CQ), and shortcut numerical techniques.',
    nidVerified: true,
    certificateVerified: true,
    studentsTaught: 142
  },
  {
    id: 'tut-2',
    name: 'Dr. Nusrat Jahan',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    university: 'Dhaka Medical College (DMC)',
    degree: 'MBBS (Intern Doctor)',
    gender: 'Female',
    verified: true,
    rating: 4.95,
    reviewsCount: 52,
    experience: '4+ Years Teaching',
    location: 'Dhaka (Dhanmondi, Badda, Shantinagar, Old Dhaka)',
    preferredMediums: ['Bangla Medium', 'English Version', 'English Medium'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'HSC Batch', 'Medical (MBBS)'],
    subjects: ['Biology (জীববিজ্ঞান)', 'Chemistry (রসায়ন)'],
    modes: ['Home Tutor', 'Online'],
    monthlyFee: '৳7,000 - ৳9,000 / month',
    hourlyFee: 850,
    availability: 'Sun, Tue, Thu (6:00 PM - 9:30 PM)',
    bio: 'Dedicated medical mentor specializing in Botany, Zoology, and Organic Chemistry. Special emphasis on high-yield diagrams, memory retention tricks, and medical admission questions.',
    nidVerified: true,
    certificateVerified: true,
    studentsTaught: 98
  },
  {
    id: 'tut-3',
    name: 'Farhan Kabir',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    university: 'University of Dhaka (DU - Dept. of English)',
    degree: 'B.A. (Hons) & M.A. in English',
    gender: 'Male',
    verified: true,
    rating: 4.85,
    reviewsCount: 44,
    experience: '6 Years Teaching',
    location: 'Dhaka (Uttara, Gulshan, Banani, Bashundhara R/A)',
    preferredMediums: ['English Version', 'English Medium', 'Bangla Medium'],
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    subjects: ['English (ইংরেজি)', 'Bangla (বাংলা)'],
    modes: ['Home Tutor', 'Online'],
    monthlyFee: '৳5,000 - ৳7,500 / month',
    hourlyFee: 700,
    availability: 'Daily (4:00 PM - 8:00 PM)',
    bio: 'IELTS 8.5 achiever and DU English graduate. Specializes in grammatical accuracy, creative writing, comprehension, and board exam presentation.',
    nidVerified: true,
    certificateVerified: true,
    studentsTaught: 210
  },
  {
    id: 'tut-4',
    name: 'Sadia Rahman',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    university: 'BRAC University (Computer Science)',
    degree: 'B.Sc. in CSE',
    gender: 'Female',
    verified: true,
    rating: 4.8,
    reviewsCount: 29,
    experience: '3 Years Teaching',
    location: 'Dhaka (Mohammadpur, Dhanmondi, Mirpur)',
    preferredMediums: ['Bangla Medium', 'English Version'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'HSC Batch'],
    subjects: ['ICT (তথ্য ও যোগাযোগ প্রযুক্তি)', 'General Mathematics (গণিত)'],
    modes: ['Online', 'Home Tutor'],
    monthlyFee: '৳4,500 - ৳6,000 / month',
    hourlyFee: 600,
    availability: 'Fri, Sat, Mon (7:00 PM - 9:00 PM)',
    bio: 'Passionate about demystifying ICT: C programming, HTML, Number Systems, and Logic Gates made crystal clear with real code examples and visual explanations.',
    nidVerified: true,
    certificateVerified: true,
    studentsTaught: 76
  },
  {
    id: 'tut-5',
    name: 'Md. Asif Chowdhury',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    university: 'IBA, University of Dhaka',
    degree: 'BBA & MBA, IBA (DU)',
    gender: 'Male',
    verified: true,
    rating: 4.92,
    reviewsCount: 31,
    experience: '5 Years Teaching',
    location: 'Dhaka (Gulshan, Banani, Dhanmondi)',
    preferredMediums: ['English Medium', 'English Version'],
    classes: ['Class 11', 'Class 12', 'IBA & BBA Admission'],
    subjects: ['Accounting (হিসাববিজ্ঞান)', 'Finance & Banking (ফিন্যান্স)', 'Admission Math & Analytical'],
    modes: ['Online', 'Coaching Batch', 'Home Tutor'],
    monthlyFee: '৳8,000 - ৳12,000 / month',
    hourlyFee: 1000,
    availability: 'Mon, Wed, Fri (6:00 PM - 8:30 PM)',
    bio: 'Top IBA percentile mentor. Prepares HSC Commerce students for board examinations and competitive BBA / IBA admission tests.',
    nidVerified: true,
    certificateVerified: true,
    studentsTaught: 115
  },
  {
    id: 'tut-6',
    name: 'Anika Tasnim',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    university: 'Viqarunnisa Noon College & DU Biochemistry',
    degree: 'B.Sc. in Biochemistry & Molecular Biology',
    gender: 'Female',
    verified: true,
    rating: 4.9,
    reviewsCount: 37,
    experience: '4 Years Teaching',
    location: 'Dhaka (Shantinagar, Malibagh, Kakrail, Bailey Road)',
    preferredMediums: ['Bangla Medium', 'English Version'],
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    subjects: ['General Science (সাধারণ বিজ্ঞান)', 'Chemistry (রসায়ন)', 'General Mathematics (গণিত)'],
    modes: ['Home Tutor', 'Online'],
    monthlyFee: '৳5,000 - ৳7,000 / month',
    hourlyFee: 650,
    availability: 'Sat, Sun, Tue, Thu (4:30 PM - 7:30 PM)',
    bio: 'Friendly and systematic teacher helping school students build a strong love for STEM subjects. Regular weekly quizzes and structured notes provided.',
    nidVerified: true,
    certificateVerified: true,
    studentsTaught: 89
  }
];

export const INITIAL_TUITION_REQUESTS = [
  {
    id: 'req-1',
    guardianName: 'Mrs. Selina Akhter',
    studentClass: 'Class 10 (SSC 2027)',
    medium: 'English Version',
    subject: 'Physics & Higher Mathematics',
    location: 'Mirpur DOHS, Dhaka',
    daysPerWeek: '3 days/week',
    preferredTime: '6:30 PM - 8:00 PM',
    monthlyBudget: '৳7,000',
    preferredGender: 'Male (BUET / DU preferred)',
    status: 'Open',
    postedTime: '2 hours ago',
    applicantsCount: 4,
    description: 'Looking for a dedicated tutor to cover Physics chapters 4-8 and Higher Math coordinate geometry before the 2nd term exam.'
  },
  {
    id: 'req-2',
    guardianName: 'Advocate Mahbubur Rahman',
    studentClass: 'Class 8 (Junior Secondary)',
    medium: 'Bangla Medium',
    subject: 'Mathematics, Science & English',
    location: 'Dhanmondi Road 12, Dhaka',
    daysPerWeek: '4 days/week',
    preferredTime: '5:00 PM - 6:30 PM',
    monthlyBudget: '৳8,000',
    preferredGender: 'Female or Male',
    status: 'Open',
    postedTime: '5 hours ago',
    applicantsCount: 6,
    description: 'Need a patient teacher who can explain algebra and geometry fundamentals with regular weekly tests and homework checking.'
  },
  {
    id: 'req-3',
    guardianName: 'Dr. Kazi Ashikur',
    studentClass: 'Class 12 (HSC Batch)',
    medium: 'Bangla Medium',
    subject: 'Biology & Chemistry',
    location: 'Uttara Sector 7, Dhaka',
    daysPerWeek: '3 days/week',
    preferredTime: '7:00 PM - 8:30 PM',
    monthlyBudget: '৳9,000',
    preferredGender: 'Female (Medical student preferred)',
    status: 'Open',
    postedTime: 'Yesterday',
    applicantsCount: 8,
    description: 'Daughter preparing for HSC 2026 and prospective medical admission. Needs intensive organic chemistry practice and Botany revision.'
  },
  {
    id: 'req-4',
    guardianName: 'Mrs. Rokeya Begum',
    studentClass: 'Class 4 (Primary)',
    medium: 'Bangla Medium',
    subject: 'All Subjects (All-in-One)',
    location: 'Mohammadpur Tajmahal Road, Dhaka',
    daysPerWeek: '5 days/week',
    preferredTime: '4:00 PM - 5:30 PM',
    monthlyBudget: '৳5,500',
    preferredGender: 'Female',
    status: 'Open',
    postedTime: '2 days ago',
    applicantsCount: 11,
    description: 'Looking for a caring female tutor for primary child. Handwriting improvement, daily homework supervision, and math drilling.'
  }
];

export const MOCK_COURSES = [
  {
    id: 'crs-1',
    title: 'SSC 2027 Complete Higher Math Masterclass',
    instructor: 'Engr. Tanvir Ahmed (BUET)',
    rating: 4.9,
    studentsEnrolled: 820,
    classesCount: 48,
    duration: '4 Months Live Batch',
    price: 3500,
    originalPrice: 5000,
    tag: 'Bestseller',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    classLevel: 'Class 10 / SSC',
    medium: 'Bangla Medium & English Version'
  },
  {
    id: 'crs-2',
    title: 'HSC Physics 1st Paper: Mechanics & Waves Blueprint',
    instructor: 'Engr. Tanvir Ahmed & DU Physics Team',
    rating: 4.95,
    studentsEnrolled: 1140,
    classesCount: 36,
    duration: '3 Months Live Batch',
    price: 4200,
    originalPrice: 6000,
    tag: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
    classLevel: 'Class 11 / 12 / HSC',
    medium: 'Bangla Medium'
  },
  {
    id: 'crs-3',
    title: 'Medical Admission Biology High-Yield Master Batch',
    instructor: 'Dr. Nusrat Jahan (DMC)',
    rating: 4.92,
    studentsEnrolled: 950,
    classesCount: 42,
    duration: 'Medical Prep Crash Course',
    price: 4500,
    originalPrice: 6500,
    tag: 'Medical Special',
    thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600',
    classLevel: 'HSC & Admission',
    medium: 'Bangla Medium & English Version'
  },
  {
    id: 'crs-4',
    title: 'Class 8 Junior Science & Math Foundation Builder',
    instructor: 'Anika Tasnim (DU)',
    rating: 4.88,
    studentsEnrolled: 640,
    classesCount: 30,
    duration: 'Semester Batch',
    price: 2800,
    originalPrice: 4000,
    tag: 'Foundation',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
    classLevel: 'Class 8',
    medium: 'Bangla Medium'
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    subject: 'Physics',
    chapter: 'Chapter 3: Force & Dynamics (বল ও গতি)',
    question: 'একটি ৫ কেজি ভরের বস্তুর উপর ২০ নিউটন বল প্রযুক্ত হলে বস্তুটির ত্বরণ (Acceleration) কত হবে?',
    options: ['২ মি/সে²', '৪ মি/সে²', '১০০ মি/সে²', '০.২৫ মি/সে²'],
    correctIndex: 1,
    explanation: 'নিউটনের দ্বিতীয় সূত্র মতে F = ma, সুতরাং ত্বরণ a = F / m = ২০ নিউটন / ৫ কেজি = ৪ মি/সে²।'
  },
  {
    id: 2,
    subject: 'Physics',
    chapter: 'Chapter 4: Work, Power & Energy',
    question: 'কোনো বস্তুর বেগ দ্বিগুণ করা হলে তার গতিশক্তি (Kinetic Energy) কত গুণ বৃদ্ধি পাবে?',
    options: ['দ্বিগুণ (2x)', 'সমান থাকবে (1x)', 'চারগুণ (4x)', 'অর্ধেক (0.5x)'],
    correctIndex: 2,
    explanation: 'গতিশক্তি E_k = 1/2 * m * v²। বেগ v দ্বিগুণ (2v) হলে গতিশক্তি (2)² = ৪ গুণ হবে।'
  },
  {
    id: 3,
    subject: 'Higher Mathematics',
    chapter: 'Trigonometry & Calculus',
    question: 'sin²(θ) + cos²(θ) এর মান কত?',
    options: ['0', '1', '-1', 'tan(θ)'],
    correctIndex: 1,
    explanation: 'ত্রিকোণমিতিক মৌলিক সূত্র অনুযায়ী sin²θ + cos²θ = 1।'
  },
  {
    id: 4,
    subject: 'Chemistry',
    chapter: 'Periodic Table & Chemical Bonding',
    question: 'পানিতে (H₂O) অক্সিজেন পরমাণুর যোজ্যতা (Valency) কত?',
    options: ['১', '২', '৩', '৪'],
    correctIndex: 1,
    explanation: 'অক্সিজেন দুটি হাইড্রোজেন পরমাণুর সাথে বন্ধন তৈরি করে, তাই পানিতে অক্সিজেনের যোজ্যতা ২।'
  },
  {
    id: 5,
    subject: 'ICT',
    chapter: 'Number Systems & Logic Gates',
    question: 'বাইনারি সংখ্যা (1010)₂ এর ডেসিমাল (দশমিক) সমতুল্য মান কত?',
    options: ['8', '10', '12', '16'],
    correctIndex: 1,
    explanation: '(1*2³) + (0*2²) + (1*2¹) + (0*2⁰) = 8 + 0 + 2 + 0 = 10।'
  }
];

export const GUARDIAN_CHILDREN = [
  {
    id: 'ch-1',
    name: 'Rahim Rahman',
    classLevel: 'Class 8',
    medium: 'Bangla Medium',
    school: 'Dhaka Residential Model College',
    attendance: '94%',
    streak: 8,
    subjectsProgress: [
      { subject: 'Mathematics', score: 88, status: 'Strong' },
      { subject: 'Science', score: 82, status: 'Good' },
      { subject: 'English', score: 71, status: 'Needs Practice' },
      { subject: 'ICT', score: 95, status: 'Mastered' }
    ],
    tutorsAssigned: [
      { name: 'Anika Tasnim', subject: 'General Science', schedule: 'Sun, Tue, Thu 5 PM' },
      { name: 'Farhan Kabir', subject: 'English', schedule: 'Mon, Wed 6 PM' }
    ],
    pendingDues: 0
  },
  {
    id: 'ch-2',
    name: 'Karim Rahman',
    classLevel: 'Class 5 (Primary)',
    medium: 'Bangla Medium',
    school: 'St. Joseph Higher Secondary School',
    attendance: '98%',
    streak: 12,
    subjectsProgress: [
      { subject: 'Mathematics', score: 92, status: 'Mastered' },
      { subject: 'Bangla', score: 86, status: 'Strong' },
      { subject: 'General Science', score: 89, status: 'Strong' },
      { subject: 'English', score: 78, status: 'Good' }
    ],
    tutorsAssigned: [
      { name: 'Sadia Rahman', subject: 'All Primary Subjects', schedule: 'Daily 4:30 PM' }
    ],
    pendingDues: 5000
  }
];

export const GAMIFICATION_BADGES = [
  { id: 'b1', name: '7-Day Streak', icon: '🔥', description: 'Learned for 7 consecutive days', unlocked: true },
  { id: 'b2', name: 'Math Master', icon: '📐', description: 'Scored 90%+ in 5 Math Quizzes', unlocked: true },
  { id: 'b3', name: 'Quiz Prodigy', icon: '⚡', description: 'Answered 100 questions correctly', unlocked: true },
  { id: 'b4', name: 'Science Explorer', icon: '🔬', description: 'Completed Physics & Chemistry modules', unlocked: false },
  { id: 'b5', name: 'Exam Champion', icon: '🏆', description: 'Ranked top 10% in Model Test', unlocked: false }
];
