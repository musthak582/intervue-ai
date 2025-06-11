import { useState, useContext, useEffect } from 'react';
import HERO_IMG from '../assets/hero-new.png';
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import {
  FiMic,
  FiMessageSquare,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiArrowRight
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import Modal from '../components/Modal';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };

  const featureIcons = {
    "AI-Powered": <LuSparkles className="text-amber-500" />,
    "Practice": <FiMic className="text-amber-500" />,
    "Feedback": <FiMessageSquare className="text-amber-500" />,
    "Community": <FiUsers className="text-amber-500" />,
    "Resources": <FiBookOpen className="text-amber-500" />,
    "Success": <FiAward className="text-amber-500" />
  };

  return (
    <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-0"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="w-[400px] h-[400px] bg-amber-100/20 blur-[65px] absolute bottom-20 right-0 z-0"
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 5
        }}
      />

      <div className="container mx-auto px-4 pt-6 pb-[120px] relative z-10">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-2 rounded-lg">
              <FiMic className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600">
              InterVue AI
            </span>
          </motion.div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(251, 146, 36, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Get Started <FiArrowRight className="text-sm" />
            </motion.button>
          )}
        </motion.header>

        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-full md:w-1/2" variants={itemVariants}>
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <LuSparkles />
                </motion.span>
                AI-Powered Interview Coach
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ace Your Next <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600"
              >
                Technical Interview
              </motion.span>
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Get role-specific questions, personalized feedback, and AI-powered coaching to help you
              land your dream job. From preparation to mastery — your ultimate interview toolkit is here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-sm font-semibold text-white px-8 py-3 rounded-full hover:shadow-lg transition-all cursor-pointer"
                onClick={handleCTA}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(251, 146, 36, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Start Practicing <FiArrowRight />
              </motion.button>

              <motion.button
                className="flex items-center gap-2 border border-gray-300 text-sm font-semibold text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            variants={itemVariants}
          >
            <motion.img
              src={HERO_IMG}
              alt="AI Interview Practice"
              className="w-full rounded-xl shadow-xl border border-amber-100"
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Master the Interview Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform is designed to help you excel at every stage of your interview preparation
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <motion.div
                  key={feature.id}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                  variants={featureCardVariants}
                  whileHover="hover"
                >
                  <div className="bg-amber-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {featureIcons[feature.title.split(' ')[0]] || <LuSparkles className="text-amber-500" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {APP_FEATURES.slice(3).map((feature) => (
                <motion.div
                  key={feature.id}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                  variants={featureCardVariants}
                  whileHover="hover"
                >
                  <div className="bg-amber-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {featureIcons[feature.title.split(' ')[0]] || <LuSparkles className="text-amber-500" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-amber-50 to-amber-100/50 py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Ace Your Next Interview?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Join thousands of candidates who landed their dream jobs with InterVue AI
            </p>
            <motion.button
              className="flex items-center gap-2 mx-auto bg-gradient-to-r from-amber-500 to-amber-400 text-sm font-semibold text-white px-8 py-3 rounded-full hover:shadow-lg transition-all cursor-pointer"
              onClick={handleCTA}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(251, 146, 36, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started for Free <FiArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="w-full bg-white border-t border-gray-100 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-2 rounded-lg">
              <FiMic className="text-white text-lg" />
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600">
              InterVue AI
            </span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} InterVue AI. All rights reserved.</p>
        </div>
      </motion.footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {openAuthModal && (
          <Modal
            isOpen={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
              setCurrentPage('login');
            }}
            hideHeader
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === "login" && (
                <Login setCurrentPage={setCurrentPage} />
              )}
              {currentPage === "signup" && (
                <SignUp setCurrentPage={setCurrentPage} />
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;