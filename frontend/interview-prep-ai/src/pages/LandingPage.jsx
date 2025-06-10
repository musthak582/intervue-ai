import { useState, useContext, useEffect } from 'react'
import HERO_IMG from '../assets/hero-new.png'
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu'
import Modal from '../components/Modal'
import Login from '../pages/Auth/Login'
import SignUp from '../pages/Auth/SignUp'
import { UserContext } from '../context/userContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'
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
  }

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
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF]">
        <motion.div
          className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"
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
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* header */}
          <motion.header
            className="flex justify-between items-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xl text-black font-bold">
              InterVue AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <motion.button
                className="bg-[#FF9324] text-sm font-semibold text-black px-7 py-2.5 rounded-full  hover:bg-black hover:text-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#000",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Login/Sign Up
              </motion.button>
            )}
          </motion.header>

          {/* Hero Content */}
          <motion.div
            className="flex flex-col md:flex-row items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0" variants={itemVariants}>
              <motion.div
                className="flex items-center justify-left mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <LuSparkles />
                  </motion.span>
                  AI Powered
                </div>
              </motion.div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <motion.span
                  className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                >
                  AI-Powered
                </motion.span>{" "}
                Learning
              </h1>
            </motion.div>

            <motion.div className="w-full md:w-1/2" variants={itemVariants}>
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is here.
              </p>

              <motion.button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#FF9324] hover:text-black  transition-colors cursor-pointer"
                onClick={handleCTA}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#FF9324",
                  color: "#000"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div>
          <motion.section
            className="flex items-center justify-center -mt-36"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.img
              src={HERO_IMG}
              alt="hero"
              className="w-[80vw] rounded-lg"
              whileHover={{ scale: 1.01 }}
            />
          </motion.section>
        </div>

        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <motion.section
              className="mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.h2
                className="text-2xl font-medium text-center mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Features That make You Shine
              </motion.h2>

              <motion.div
                className="flex flex-col items-center gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* first 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      className="bg-[#FFFEF8] rounded-xl shadow-xs p-6 hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                      variants={featureCardVariants}
                      whileHover="hover"
                      custom={index}
                    >
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* remaining 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3).map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      className="bg-[#FFFEF8] rounded-xl shadow-xs p-6 hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                      variants={featureCardVariants}
                      whileHover="hover"
                      custom={index + 3}
                    >
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.section>
          </div>
        </div>

        <motion.div
          className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Made With❤️... Happy Coding
        </motion.div>
      </div>

      <AnimatePresence>
        {openAuthModal && (
          <Modal
            isOpen={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
              setCurrentPage('login')
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
    </>
  )
}

export default LandingPage