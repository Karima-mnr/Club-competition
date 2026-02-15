'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Hash, 
  BookOpen,
  Globe,
  Smartphone,
  Cpu,
  Rocket,
  Shield,
  Github,
  Code,
  Monitor,
  Server,
  Camera,
  Video,
  Users,
  Star,
  Target,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Wifi,
  Cloud,
  Calendar,
  MapPin,
  Clock,
  Laptop,
  AlertTriangle,
  XCircle
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const translations = {
  title: 'Competition Registration',
  subtitle: 'Fill in your details to participate',
  backButton: 'Back to Home',
  success: 'Registration Successful!',
  successMessage: 'Thank you for registering! We\'ve sent a confirmation email with all the details.',
  returnHome: 'Return to Home',
  fullName: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  matricule: 'Matricule',
  level: 'University Level',
  category: 'Competition Category',
  selectLevel: 'Select your level',
  l1: 'L1 - First Year',
  l2: 'L2 - Second Year',
  l3: 'L3 - Third Year',
  m1: 'M1 - Master 1',
  m2: 'M2 - Master 2',
  // Categories
  web: 'Web Development',
  mobile: 'Mobile Development',
  ai: 'AI & Machine Learning',
  iot: 'IoT & Robotics',
  security: 'Network & Security',
  media: 'Media Team',
  webSpecialization: 'Choose your specialization',
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  fullstack: 'Full Stack Development',
  mediaSpecialization: 'Choose your focus',
  photography: 'Photography',
  videography: 'Videography',
  editing: 'Video Editing',
  socialMedia: 'Social Media Management',
  content: 'Content Creation',
  github: 'GitHub Profile Link',
  submit: 'Register for Competition',
  processing: 'Processing...',
  agree: 'By registering, you agree to participate in the competition and receive emails about it.',
  deadlinePassed: 'Registration Deadline Passed',
  deadlineMessage: 'Sorry, registration closed on February 22, 2026 at 23:59. See you at the competition!',
  placeholder: {
    fullName: 'Enter your full name',
    email: 'Enter your email',
    phone: 'Enter your 10-digit phone number',
    matricule: 'Enter your matricule',
    github: 'https://github.com/username'
  }
}

const categories = [
  { id: 'web', name: 'Web Development', icon: Globe, color: '#198ACD', hasSpecialization: true },
  { id: 'mobile', name: 'Mobile Development', icon: Smartphone, color: '#265183', hasSpecialization: false },
  { id: 'ai', name: 'AI & Machine Learning', icon: Cpu, color: '#28BBE8', hasSpecialization: false },
  { id: 'iot', name: 'IoT & Robotics', icon: Rocket, color: '#198ACD', hasSpecialization: false },
  { id: 'security', name: 'Network & Security', icon: Shield, color: '#28BBE8', hasSpecialization: false },
  { id: 'media', name: 'Media Team', icon: Camera, color: '#265183', hasSpecialization: true }
]

const specializations = {
  web: [
    { id: 'frontend', name: 'Frontend Development', icon: Monitor },
    { id: 'backend', name: 'Backend Development', icon: Server },
    { id: 'fullstack', name: 'Full Stack Development', icon: Code }
  ],
  media: [
    { id: 'photo', name: 'Photography', icon: Camera },
    { id: 'video', name: 'Videography', icon: Video },
    { id: 'editing', name: 'Video Editing', icon: Monitor },
    { id: 'social', name: 'Social Media', icon: Users },
    { id: 'content', name: 'Content Creation', icon: Camera }
  ]
}

export default function RegistrationForm({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    matricule: '',
    level: '',
    category: '',
    specialization: '',
    github: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [deadlinePassed, setDeadlinePassed] = useState(false)

  const t = translations

  useEffect(() => {
    const checkDeadline = () => {
      const now = new Date()
      const deadline = new Date('2026-02-22T23:59:59')
      setDeadlinePassed(now > deadline)
    }
    
    checkDeadline()
    const interval = setInterval(checkDeadline, 60000) 
    
    return () => clearInterval(interval)
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required'
    
    const phoneRegex = /^0[5-7][0-9]{8}$/
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Algeria phone number (e.g., 0550123456)'
    }
    
    if (!formData.matricule.trim()) newErrors.matricule = 'Matricule is required'
    if (!formData.level) newErrors.level = 'Level is required'
    if (!formData.category) newErrors.category = 'Category is required'
    
    const selectedCategory = categories.find(c => c.id === formData.category)
    if (selectedCategory?.hasSpecialization && !formData.specialization) {
      newErrors.specialization = 'Specialization is required'
    }
    
    if (formData.github && !formData.github.match(/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/)) {
      newErrors.github = 'Please enter a valid GitHub URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (deadlinePassed) {
      setErrors({ deadline: 'Registration closed on February 22, 2026 at 23:59' })
      return
    }
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      setIsSubmitting(false)
      setIsSuccess(true)
      
    } catch (error) {
      setIsSubmitting(false)
      setErrors({ submit: error.message })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '')
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numbersOnly }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const selectedCategory = categories.find(c => c.id === formData.category)

  if (deadlinePassed) {
    return (
      <div className="min-h-screen bg-[#121B21] flex items-center justify-center p-4">
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-custom opacity-90" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md w-full"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-red-500/20 p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">{t.deadlinePassed}</h2>
            <p className="text-gray-400 mb-6">{t.deadlineMessage}</p>
            
            <div className="bg-[#854d0e20] border border-[#854d0e] rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-[#fbbf24] font-semibold">Competition Day:</span>
              </div>
              <p className="text-gray-300 text-sm">
                <span className="block mb-1">📅 February 24, 2026</span>
                <span className="block mb-1">⏰ 8:30 AM </span>
                <span className="block">📍 University HASSIBA BENBOUALI - Department Department Computer Science</span>
              </p>
            </div>

            <motion.button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-[#198ACD] to-[#28BBE8] text-white font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121B21] flex items-center justify-center p-4 py-8">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-custom opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#198ACD] rounded-full blur-[128px] opacity-20" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#28BBE8] rounded-full blur-[128px] opacity-20" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          {t.backButton}
        </motion.button>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-white mb-2">{t.success}</h2>
                <p className="text-gray-400 text-sm">{t.successMessage}</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#198ACD10] to-[#28BBE810] rounded-xl p-5 mb-6 border border-[#28BBE8]20">
                <h3 className="text-[#28BBE8] font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Competition Day Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#198ACD20] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#198ACD]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="text-white font-medium">February 24, 2026</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#28BBE820] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#28BBE8]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Time</p>
                      <p className="text-white font-medium">8:30 AM - 5:00 PM</p>
                      <p className="text-[#28BBE8] text-xs mt-1">Please arrive at 8:30 AM for check-in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#26518320] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#265183]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Location</p>
                      <p className="text-white font-medium">University HASSIBA BENBOUALI</p>
                      <p className="text-gray-300 text-sm">Department Computer Science</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#854d0e20] rounded-xl p-5 mb-6 border border-[#854d0e]">
                <h3 className="text-[#fbbf24] font-semibold mb-3 flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  What to Bring
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
                    <p className="text-gray-300 text-sm">Your laptop and charger</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
                    <p className="text-gray-300 text-sm">A project you've built before to showcase your skills</p>
                  </div>
                  {formData.category === 'iot' && (
                    <div className="flex items-center gap-2 bg-[#854d0e30] p-2 rounded-lg mt-2">
                      <AlertTriangle className="w-4 h-4 text-[#fbbf24]" />
                      <p className="text-[#fbbf24] text-sm font-medium">Bring your IoT/Robotics projects to demonstrate!</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
                    <p className="text-gray-300 text-sm">Your student ID (Carte Étudiant)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
                    <p className="text-gray-300 text-sm">Enthusiasm and creativity! ✨</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#198ACD10] rounded-lg p-4 mb-6 border border-[#198ACD]30">
                <p className="text-gray-300 text-sm text-center">
                  ⏰ <span className="text-white font-medium">8:30 AM sharp:</span> Check-in with your student ID 
                  to verify your name and team assignment.
                </p>
              </div>
              
              <motion.button
                onClick={onBack}
                className="w-full py-3 bg-gradient-to-r from-[#198ACD] to-[#28BBE8] text-white font-semibold rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.returnHome}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14">
                  <Image
                    src="/infoBrainsLogo.png"
                    alt="InfoBrains Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.title}</h2>
                  <p className="text-gray-400">{t.subtitle}</p>
                </div>
              </div>

              <div className="bg-[#854d0e20] border border-[#854d0e] rounded-lg p-3 mb-6">
                <p className="text-[#fbbf24] text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  Registration closes February 22, 2026 at 23:59
                </p>
              </div>

              {formData.category === 'iot' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#854d0e20] border border-[#854d0e] rounded-lg p-4 mb-6"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#fbbf24] font-medium mb-1">For IoT & Robotics Participants:</p>
                      <p className="text-gray-300 text-sm">
                        Please bring your IoT/Robotics projects to showcase your work during the competition!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-[#198ACD]'
                    }`}
                    placeholder={t.placeholder.fullName}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-[#198ACD]'
                    }`}
                    placeholder={t.placeholder.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-[#198ACD]'
                    }`}
                    placeholder="enter your phone"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Enter 10-digit Algeria number (e.g., 0550123456)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Hash className="w-4 h-4 inline mr-2" />
                    {t.matricule}
                  </label>
                  <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.matricule 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-[#198ACD]'
                    }`}
                    placeholder={t.placeholder.matricule}
                  />
                  {errors.matricule && (
                    <p className="mt-1 text-sm text-red-500">{errors.matricule}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    {t.level}
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.level 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-[#198ACD]'
                    }`}
                  >
                    <option value="" className="bg-[#121B21]">{t.selectLevel}</option>
                    <option value="L1" className="bg-[#121B21]">{t.l1}</option>
                    <option value="L2" className="bg-[#121B21]">{t.l2}</option>
                    <option value="L3" className="bg-[#121B21]">{t.l3}</option>
                    <option value="M1" className="bg-[#121B21]">{t.m1}</option>
                    <option value="M2" className="bg-[#121B21]">{t.m2}</option>
                  </select>
                  {errors.level && (
                    <p className="mt-1 text-sm text-red-500">{errors.level}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.category}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => {
                      const Icon = cat.icon
                      const isSelected = formData.category === cat.id
                      
                      return (
                        <motion.button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, category: cat.id, specialization: '' }))
                            if (errors.category) {
                              setErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.category
                                return newErrors
                              })
                            }
                          }}
                          className={`relative p-4 rounded-lg border transition-all ${
                            isSelected
                              ? 'border-[#198ACD] bg-[#198ACD]/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Icon className="w-6 h-6" style={{ color: cat.color }} />
                            <span className="text-sm text-white">{cat.name}</span>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <CheckCircle className="w-4 h-4 text-[#198ACD]" />
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                {selectedCategory?.hasSpecialization && formData.category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {formData.category === 'web' ? t.webSpecialization : t.mediaSpecialization}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {specializations[formData.category].map((spec) => {
                        const Icon = spec.icon
                        const isSelected = formData.specialization === spec.id
                        
                        return (
                          <motion.button
                            key={spec.id}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, specialization: spec.id }))
                              if (errors.specialization) {
                                setErrors(prev => {
                                  const newErrors = { ...prev }
                                  delete newErrors.specialization
                                  return newErrors
                                })
                              }
                            }}
                            className={`relative p-3 rounded-lg border transition-all ${
                              isSelected
                                ? 'border-[#28BBE8] bg-[#28BBE8]/10'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" style={{ color: '#28BBE8' }} />
                              <span className="text-sm text-white">{spec.name}</span>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                    {errors.specialization && (
                      <p className="mt-1 text-sm text-red-500">{errors.specialization}</p>
                    )}
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Github className="w-4 h-4 inline mr-2" />
                    {t.github} <span className="text-gray-500 text-xs">(optional)</span>
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.github 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/10 focus:ring-[#198ACD]'
                    }`}
                    placeholder={t.placeholder.github}
                  />
                  {errors.github && (
                    <p className="mt-1 text-sm text-red-500">{errors.github}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-sm text-red-500 text-center">{errors.submit}</p>
                )}
                {errors.deadline && (
                  <p className="text-sm text-red-500 text-center">{errors.deadline}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#198ACD] to-[#28BBE8] text-white font-semibold rounded-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.processing}
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">{t.submit}</span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#28BBE8] to-[#198ACD]"
                        initial={{ x: '100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  {t.agree}
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}