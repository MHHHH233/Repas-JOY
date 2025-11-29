import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import FullLogo from "../assets/fullLogo-.png"

export function Footer() {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const footerSections = [
    {
      id: "quick-links",
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Food", href: "/menu" },
        { name: "Groceries", href: "/groceries" },
        { name: "Alcohol", href: "/alcohol" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      id: "support",
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "FAQ", href: "/faq" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Returns", href: "/returns" },
        { name: "Accessibility", href: "/accessibility" }
      ]
    },
    {
      id: "business",
      title: "For Business",
      links: [
        { name: "Partner with Us", href: "/partner" },
        { name: "Become a Dasher", href: "/dasher" },
        { name: "Restaurant Partners", href: "/restaurants" },
        { name: "Enterprise", href: "/enterprise" },
        { name: "Careers", href: "/careers" }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 w-full min-h-screen flex flex-col">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div 
                className="w-20 h-12 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img src={FullLogo} alt="Repas Joy Logo" className="w-full h-full object-contain" />
              </motion.div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Delivering delicious food to your doorstep. Fast, fresh, and always satisfying.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400 text-sm">support@repasjoy.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                <span className="text-gray-400 text-sm">123 Food Street, NY 10001</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Desktop View */}
              <div className="hidden lg:block">
                <h3 className="font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile View - Collapsible */}
              <div className="lg:hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full py-2 text-left"
                >
                  <h3 className="font-bold text-white">{section.title}</h3>
                  {openSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openSections[section.id] && (
                    <motion.ul 
                      className="space-y-2 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link 
                            to={link.href} 
                            className="text-gray-400 hover:text-orange-500 transition-colors text-sm block py-1"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-500 transition"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook className="w-6 h-6" />
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-500 transition"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-6 h-6" />
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-orange-500 transition"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="text-center border-t border-gray-800 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            &copy; 2025 Repas Joy. All rights reserved. | Designed with care for food lovers everywhere.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
