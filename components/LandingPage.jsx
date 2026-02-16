'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Rocket, 
  Palette,
  Users,
  Trophy,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  Shield,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Heart,
  Code,
  Zap,
  UserPlus,
  Briefcase,
  GraduationCap,
  Calendar,
  Users2,
  Coffee,
  Gamepad,
  Mic,
  Timer
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import RegistrationForm from './RegistrationForm'

const translations = {
  en: {
    clubBadge: "InfoBrains Club Recruitment",
    heroTitle: "Join the",
    heroTitleGradient: "InfoBrains Club",
    heroDescription: "Passionate about tech? Participate in our competition and become part of a community of innovators at our university.",
    registerButton: "Register for Competition",
    learnMore: "Learn More",
    categoriesTitle: "Choose Your",
    categoriesTitleGradient: "Expertise",
    categoriesDescription: "Show us your skills in your preferred field",
    howItWorksTitle: "How It",
    howItWorksGradient: "Works",
    howItWorksDescription: "Your journey to becoming an InfoBrains member",
    step1Title: "Register",
    step1Desc: "Fill out the form with your details and choose your category",
    step2Title: "Compete",
    step2Desc: "Participate in the competition and showcase your skills",
    step3Title: "Join",
    step3Desc: "Successful candidates become InfoBrains members",
    benefitsTitle: "Why Join",
    benefitsGradient: "InfoBrains?",
    benefitsDescription: "What awaits you as a club member",
    benefit1: "Join an exclusive community",
    benefit2: "Participate in workshops & events",
    benefit3: "Learn from peers",
    benefit4: "Build your portfolio",
    ctaTitle: "Ready to",
    ctaGradient: "Join Us?",
    ctaDescription: "Register now for the competition and show us what you've got!",
    ctaButton: "Register Now",
    timelineButton: "View Timeline",
    footerTagline: "Empowering the next generation of innovators through collaborative learning and real-world projects.",
    contactEmail: "infobrains@gmail.com",
    contactPhone: "0550000000",
    contactAddress: "University HASSIBA BENBOUALI Chlef, Tech Building",
    competitionLinks: "Competition",
    supportLinks: "Support",
    legalLinks: "Legal",
    newsletter: "Stay Updated",
    subscribe: "Subscribe",
    madeWith: "Made with",
    by: "by the InfoBrains team",
    privacy: "Privacy",
    terms: "Terms",
    activitiesTitle: "Club",
    activitiesGradient: "Activities",
    activitiesDescription: "More than just a club - a community of innovators",
    activity1: "Weekly Workshops",
    activity2: "Hackathons",
    activity3: "Tech Events",
    activity4: "Project Collaborations",
    activity5: "Guest Speakers",
    activity6: "Social Gatherings",
    timerTitle: "Registration",
    timerGradient: "Deadline",
    timerDescription: "Register before the deadline to participate",
    registrationEnds: "Registration ends in",
    competitionStarts: "Competition starts in",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds"
  },
  fr: {
    clubBadge: "Recrutement Club InfoBrains",
    heroTitle: "Rejoignez le",
    heroTitleGradient: "Club InfoBrains",
    heroDescription: "Passionné par la tech ? Participez à notre compétition et devenez membre d'une communauté d'innovateurs dans notre université.",
    registerButton: "S'inscrire à la Compétition",
    learnMore: "En Savoir Plus",
    categoriesTitle: "Choisissez Votre",
    categoriesTitleGradient: "Expertise",
    categoriesDescription: "Montrez-nous vos compétences dans votre domaine préféré",
    howItWorksTitle: "Comment Ça",
    howItWorksGradient: "Marche",
    howItWorksDescription: "Votre parcours pour devenir membre d'InfoBrains",
    step1Title: "Inscription",
    step1Desc: "Remplissez le formulaire avec vos informations et choisissez votre catégorie",
    step2Title: "Compétition",
    step2Desc: "Participez à la compétition et montrez vos talents",
    step3Title: "Intégration",
    step3Desc: "Les candidats retenus rejoignent le club InfoBrains",
    benefitsTitle: "Pourquoi Rejoindre",
    benefitsGradient: "InfoBrains?",
    benefitsDescription: "Ce qui vous attend en tant que membre",
    benefit1: "Rejoignez une communauté exclusive",
    benefit2: "Participez à des ateliers & événements",
    benefit3: "Apprenez de vos pairs",
    benefit4: "Développez votre portfolio",
    ctaTitle: "Prêt à",
    ctaGradient: "Nous Rejoindre?",
    ctaDescription: "Inscrivez-vous maintenant à la compétition et montrez-nous ce que vous savez faire !",
    ctaButton: "S'inscrire",
    timelineButton: "Voir le Calendrier",
    footerTagline: "Former la prochaine génération d'innovateurs grâce à l'apprentissage collaboratif et aux projets concrets.",
    contactEmail: "infobrains@gmail.com",
    contactPhone: "0550000000",
    contactAddress: "University HASSIBA BENBOUALI Chlef, Tech Building",
    competitionLinks: "Compétition",
    supportLinks: "Support",
    legalLinks: "Légal",
    newsletter: "Restez Informé",
    subscribe: "S'abonner",
    madeWith: "Fait avec",
    by: "par l'équipe InfoBrains",
    privacy: "Confidentialité",
    terms: "Conditions",
    activitiesTitle: "Activités du",
    activitiesGradient: "Club",
    activitiesDescription: "Plus qu'un club - une communauté d'innovateurs",
    activity1: "Ateliers Hebdomadaires",
    activity2: "Hackathons",
    activity3: "Événements Tech",
    activity4: "Projets Collaboratifs",
    activity5: "Conférenciers Invités",
    activity6: "Rencontres Sociales",
    timerTitle: "Fin des",
    timerGradient: "Inscriptions",
    timerDescription: "Inscrivez-vous avant la date limite pour participer",
    registrationEnds: "Les inscriptions se terminent dans",
    competitionStarts: "La compétition commence dans",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes"
  },
  ar: {
    clubBadge: "انضم لنادي InfoBrains",
    heroTitle: "انضم إلى",
    heroTitleGradient: "نادي InfoBrains",
    heroDescription: "شغوف بالتقنية؟ شارك في مسابقتنا وكن جزءًا من مجتمع المبتكرين في جامعتنا.",
    registerButton: "سجل في المسابقة",
    learnMore: "المزيد",
    categoriesTitle: "اختر",
    categoriesTitleGradient: "مجالك",
    categoriesDescription: "أظهر مهاراتك في المجال الذي تفضله",
    howItWorksTitle: "كيف",
    howItWorksGradient: "تعمل",
    howItWorksDescription: "رحلتك لتصبح عضوًا في InfoBrains",
    step1Title: "التسجيل",
    step1Desc: "املأ النموذج ببياناتك واختر مجالك",
    step2Title: "المسابقة",
    step2Desc: "شارك في المسابقة وأظهر مهاراتك",
    step3Title: "الانضمام",
    step3Desc: "المرشحون الناجحون ينضمون لنادي InfoBrains",
    benefitsTitle: "لماذا",
    benefitsGradient: "تنضم إلينا؟",
    benefitsDescription: "ما ينتظرك كعضو في النادي",
    benefit1: "انضم لمجتمع حصري",
    benefit2: "شارك في ورش عمل وفعاليات",
    benefit3: "تعلم من زملائك",
    benefit4: "طور محفظتك العملية",
    ctaTitle: "مستعد",
    ctaGradient: "للانضمام؟",
    ctaDescription: "سجل الآن في المسابقة وأرنا ما لديك!",
    ctaButton: "سجل الآن",
    timelineButton: "عرض الجدول",
    footerTagline: "تمكين الجيل القادم من المبتكرين من خلال التعلم التعاوني والمشاريع العملية.",
    contactEmail: "infobrains@gmail.com",
    contactPhone: "0550000000",
    contactAddress: "University HASSIBA BENBOUALI Chlef, Tech Building",
    competitionLinks: "المسابقة",
    supportLinks: "الدعم",
    legalLinks: "قانوني",
    newsletter: "ابق على اطلاع",
    subscribe: "اشتراك",
    madeWith: "صنع بـ",
    by: "فريق InfoBrains",
    privacy: "الخصوصية",
    terms: "الشروط",
    activitiesTitle: "أنشطة",
    activitiesGradient: "النادي",
    activitiesDescription: "أكثر من مجرد نادي - مجتمع من المبتكرين",
    activity1: "ورش عمل أسبوعية",
    activity2: "هاكاثونات",
    activity3: "فعاليات تقنية",
    activity4: "مشاريع تعاونية",
    activity5: "متحدثون ضيوف",
    activity6: "لقاءات اجتماعية",
    timerTitle: "آخر موعد",
    timerGradient: "للتسجيل",
    timerDescription: "سجل قبل انتهاء الموعد النهائي للمشاركة",
    registrationEnds: "ينتهي التسجيل خلال",
    competitionStarts: "تبدأ المسابقة خلال",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني"
  }
}

const categories = [
  { 
    icon: Globe, 
    name: { en: 'Web Development', fr: 'Développement Web', ar: 'تطوير الويب' },
    color: '#198ACD',
    description: { 
      en: 'Build the next generation of web applications',
      fr: 'Créez la prochaine génération d\'applications web',
      ar: 'ابنِ الجيل القادم من تطبيقات الويب'
    },
    bg: 'rgba(25, 138, 205, 0.1)'
  },
  { 
    icon: Smartphone, 
    name: { en: 'Mobile Development', fr: 'Développement Mobile', ar: 'تطوير التطبيقات' },
    color: '#265183',
    description: { 
      en: 'Create innovative mobile experiences',
      fr: 'Créez des expériences mobiles innovantes',
      ar: 'اصنع تجارب مبتكرة للهواتف'
    },
    bg: 'rgba(38, 81, 131, 0.1)'
  },
  { 
    icon: Cpu, 
    name: { en: 'AI & Machine Learning', fr: 'IA & Machine Learning', ar: 'الذكاء الاصطناعي' },
    color: '#28BBE8',
    description: { 
      en: 'Solve problems with intelligent algorithms',
      fr: 'Résolvez des problèmes avec des algorithmes intelligents',
      ar: 'حل المشكلات بخوارزميات ذكية'
    },
    bg: 'rgba(40, 187, 232, 0.1)'
  },
  { 
    icon: Rocket, 
    name: { en: 'IoT & Robotics', fr: 'IoT & Robotique', ar: 'إنترنت الأشياء والروبوتات' },
    color: '#198ACD',
    description: { 
      en: 'Connect the physical and digital worlds',
      fr: 'Connectez les mondes physique et numérique',
      ar: 'اربط العالمين المادي والرقمي'
    },
    bg: 'rgba(25, 138, 205, 0.1)'
  },
  { 
    icon: Palette, 
    name: { en: 'Media Team', fr: 'Équipe Média', ar: 'فريق الإعلام' },
    color: '#265183',
    description: { 
      en: 'Design stunning visual experiences',
      fr: 'Créez des expériences visuelles époustouflantes',
      ar: 'صمم تجارب بصرية مذهلة'
    },
    bg: 'rgba(38, 81, 131, 0.1)'
  },
  { 
    icon: Shield, 
    name: { en: 'Network & Security', fr: 'Réseaux & Sécurité', ar: 'الشبكات والأمن' },
    color: '#28BBE8',
    description: { 
      en: 'Secure the digital future with robust networks',
      fr: 'Sécurisez l\'avenir numérique avec des réseaux robustes',
      ar: 'أمن المستقبل الرقمي بشبكات قوية'
    },
    bg: 'rgba(40, 187, 232, 0.1)'
  }
]

const activities = [
  { icon: Calendar, color: '#198ACD' },
  { icon: Code, color: '#265183' },
  { icon: Mic, color: '#28BBE8' },
  { icon: Users2, color: '#198ACD' },
  { icon: Coffee, color: '#265183' },
  { icon: Gamepad, color: '#28BBE8' }
]

const footerLinks = {
  competition: [
    { name: { en: 'About', fr: 'À propos', ar: 'عن النادي' }, href: '#' },
    { name: { en: 'Categories', fr: 'Catégories', ar: 'المجالات' }, href: '#' },
    { name: { en: 'Timeline', fr: 'Calendrier', ar: 'الجدول' }, href: '#' },
    { name: { en: 'Rules', fr: 'Règles', ar: 'القواعد' }, href: '#' },
    { name: { en: 'FAQ', fr: 'FAQ', ar: 'الأسئلة' }, href: '#' }
  ],
  support: [
    { name: { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا' }, href: '#' },
    { name: { en: 'Guidelines', fr: 'Directives', ar: 'الإرشادات' }, href: '#' },
    { name: { en: 'Resources', fr: 'Ressources', ar: 'المصادر' }, href: '#' },
    { name: { en: 'Partners', fr: 'Partenaires', ar: 'الشركاء' }, href: '#' }
  ],
  legal: [
    { name: { en: 'Privacy', fr: 'Confidentialité', ar: 'الخصوصية' }, href: '#' },
    { name: { en: 'Terms', fr: 'Conditions', ar: 'الشروط' }, href: '#' },
    { name: { en: 'Code of Conduct', fr: 'Code de conduite', ar: 'قواعد السلوك' }, href: '#' }
  ]
}

const socialLinks = [
  { icon: Twitter, href: '#', color: '#1DA1F2' },
  { icon: Linkedin, href: '#', color: '#0077B5' },
  { icon: Github, href: '#', color: '#333' },
  { icon: Instagram, href: '#', color: '#E4405F' }
]

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false)
  const [language, setLanguage] = useState('en')
  const t = translations[language]

  const [timeLeft, setTimeLeft] = useState({
    registration: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    competition: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  })

  useEffect(() => {
    const registrationDeadline = new Date('2026-02-22T00:00:00').getTime()
    const competitionStart = new Date('2026-02-24T00:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()

      const registrationDistance = registrationDeadline - now
      const competitionDistance = competitionStart - now

      setTimeLeft({
        registration: {
          days: Math.floor(registrationDistance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((registrationDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((registrationDistance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((registrationDistance % (1000 * 60)) / 1000)
        },
        competition: {
          days: Math.floor(competitionDistance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((competitionDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((competitionDistance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((competitionDistance % (1000 * 60)) / 1000)
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (showForm) {
    return <RegistrationForm onBack={() => setShowForm(false)} language={language} />
  }

  return (
    <main className="min-h-screen bg-[#121B21] overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-custom opacity-90" />
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #198ACD 0%, #28BBE8 100%)',
            filter: 'blur(100px)',
            opacity: 0.15
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #265183 0%, #198ACD 100%)',
            filter: 'blur(120px)',
            opacity: 0.1
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {['en', 'fr', 'ar'].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              language === lang 
                ? 'bg-gradient-to-r from-[#198ACD] to-[#28BBE8] text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-0">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src="/infoBrainsLogo.png"
                      alt="InfoBrains Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white text-2xl font-semibold tracking-wider mt-8">
                    INFOBRAINS
                  </span>
                </motion.div>

                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-[#198ACD]/20 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <UserPlus className="w-4 h-4 text-[#28BBE8]" />
                  <span className="text-sm text-gray-300">{t.clubBadge}</span>
                </motion.div>

                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t.heroTitle}
                  <span className="block text-gradient">{t.heroTitleGradient}</span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {t.heroDescription}
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={() => setShowForm(true)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#198ACD] to-[#28BBE8] text-white font-semibold rounded-lg overflow-hidden shadow-lg shadow-[#198ACD]/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t.registerButton} <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#28BBE8] to-[#198ACD]"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  

                </motion.div>
              </motion.div>

              <motion.div
                className="relative hidden lg:block h-[600px]"
                initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div 
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#198ACD] to-[#28BBE8] rounded-full blur-3xl opacity-20" />
                </motion.div>

                {categories.slice(0, 4).map((category, index) => (
                  <motion.div
                    key={index}
                    className="absolute p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl"
                    style={{
                      left: index === 0 ? '5%' : index === 1 ? '55%' : index === 2 ? '20%' : '70%',
                      top: index === 0 ? '15%' : index === 1 ? '30%' : index === 2 ? '60%' : '75%',
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, index % 2 === 0 ? 20 : -20, 0],
                    }}
                    transition={{
                      duration: 6 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: category.bg }}
                      >
                        <category.icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <span className="text-white font-medium">{category.name[language]}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timer Section - NEW */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex p-3 bg-[#198ACD]/10 rounded-full mb-4"
              >
                <Timer className="w-6 h-6 text-[#198ACD]" />
              </motion.div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.timerTitle} <span className="text-gradient">{t.timerTitleGradient}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.timerDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Registration Deadline */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                   {t.registrationEnds}
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft.registration).map(([unit, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-white bg-white/5 rounded-lg p-3 mb-2">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-400">
                        {unit === 'days' && t.days}
                        {unit === 'hours' && t.hours}
                        {unit === 'minutes' && t.minutes}
                        {unit === 'seconds' && t.seconds}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-500 mt-4">22 February 2026 • 00:00</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {t.competitionStarts}
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft.competition).map(([unit, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-white bg-white/5 rounded-lg p-3 mb-2">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-400">
                        {unit === 'days' && t.days}
                        {unit === 'hours' && t.hours}
                        {unit === 'minutes' && t.minutes}
                        {unit === 'seconds' && t.seconds}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-500 mt-4">24 February 2026 • 00:00</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex p-3 bg-[#198ACD]/10 rounded-full mb-4"
              >
                <Sparkles className="w-6 h-6 text-[#198ACD]" />
              </motion.div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.categoriesTitle} <span className="text-gradient">{t.categoriesTitleGradient}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.categoriesDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${category.color}20, transparent 70%)`
                    }}
                  />
                  
                  <div 
                    className="relative z-10 w-16 h-16 mb-6 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: category.bg }}
                  >
                    <category.icon className="w-8 h-8" style={{ color: category.color }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{category.name[language]}</h3>
                  <p className="text-gray-400 mb-4">{category.description[language]}</p>
                  
                  <motion.div 
                    className="flex items-center text-[#28BBE8] font-medium"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t.learnMore} <ChevronRight className={`w-4 h-4 ml-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.howItWorksTitle} <span className="text-gradient">{t.howItWorksGradient}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.howItWorksDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: t.step1Title, description: t.step1Desc, icon: UserPlus },
                { step: '02', title: t.step2Title, description: t.step2Desc, icon: Trophy },
                { step: '03', title: t.step3Title, description: t.step3Desc, icon: Users }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="text-6xl font-bold text-white mb-4">{item.step}</div>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#198ACD] to-[#28BBE8] flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-[#14364a]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.benefitsTitle} <span className="text-gradient">{t.benefitsTitleGradient}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.benefitsDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { text: t.benefit1, color: '#198ACD', icon: Users },
                { text: t.benefit2, color: '#265183', icon: Calendar },
                { text: t.benefit3, color: '#28BBE8', icon: GraduationCap },
                { text: t.benefit4, color: '#198ACD', icon: Briefcase }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 text-center"
                >
                  <div 
                    className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${benefit.color}20` }}
                  >
                    <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
                  </div>
                  <p className="text-white font-medium">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Simplified CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative p-12 rounded-3xl overflow-hidden text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(25,138,205,0.1) 0%, rgba(40,187,232,0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, #198ACD 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, #28BBE8 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, #198ACD 0%, transparent 50%)',
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {t.ctaTitle} <span className="text-gradient">{t.ctaTitleGradient}</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t.ctaDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#198ACD] to-[#28BBE8] text-white font-semibold rounded-lg overflow-hidden shadow-lg shadow-[#198ACD]/20 min-w-[200px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t.ctaButton} <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#28BBE8] to-[#198ACD]"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 border-2 border-[#198ACD] text-white font-semibold rounded-lg hover:bg-[#198ACD]/10 transition-colors min-w-[200px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.timelineButton}
                </motion.button>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-sm text-gray-500"
              >
                * {language === 'en' ? 'Open to all university students • Teams of 2-6 members' : 
                   language === 'fr' ? 'Ouvert à tous les étudiants • Équipes de 2-6 membres' :
                   'مفتوح لجميع طلاب الجامعة • فرق من ٢-٤ أعضاء'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <footer className="relative border-t border-white/10 bg-[#121B21]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/infoBrainsLogo.png"
                      alt="InfoBrains Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[#28BBE8] text-xl font-semibold tracking-wider">
                    INFOBRAINS
                  </span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  {t.footerTagline}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-5 h-5 text-[#198ACD]" />
                    <span>{t.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="w-5 h-5 text-[#198ACD]" />
                    <span>{t.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-[#198ACD]" />
                    <span>{t.contactAddress}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">{t.competitionLinks}</h3>
                <ul className="space-y-2">
                  {footerLinks.competition.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-[#28BBE8] transition-colors duration-300"
                      >
                        {link.name[language]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">{t.supportLinks}</h3>
                <ul className="space-y-2">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-[#28BBE8] transition-colors duration-300"
                      >
                        {link.name[language]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">{t.legalLinks}</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-[#28BBE8] transition-colors duration-300"
                      >
                        {link.name[language]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="py-8 border-t border-white/10">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex gap-4 ml-[1000px]">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ y: -5 }}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <social.icon className="w-5 h-5" style={{ color: social.color }} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2026 InfoBrains. {language === 'en' ? 'All rights reserved.' : language === 'fr' ? 'Tous droits réservés.' : 'جميع الحقوق محفوظة.'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{t.madeWith}</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>{t.by}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <a href="#" className="hover:text-[#28BBE8] transition-colors">{t.privacy}</a>
                <span>•</span>
                <a href="#" className="hover:text-[#28BBE8] transition-colors">{t.terms}</a>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#198ACD] to-transparent opacity-20" />
          </div>
        </footer>
      </div>
    </main>
  )
}