import { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment'
import SummayCard from '../../components/Cards/SummayCard';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
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
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0"
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
        >
          <AnimatePresence>
            {sessions?.map((data, index) => (
              <motion.div
                key={data?._id}
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <SummayCard
                  color={CARD_BG[index % CARD_BG.length]}
                  role={data?.role}
                  topics={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || ""}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("DD MMM, YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.button
          className="h-12 md:h-12 flex items-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#000",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          >
            <LuPlus className="text-2xl text-white" />
          </motion.span>
          Add New
        </motion.button>
      </div>

      <AnimatePresence>
        {openCreateModal && (
          <Modal
            isOpen={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            hideHeader
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CreateSessionForm
                onSuccess={() => {
                  setOpenCreateModal(false);
                  fetchAllSessions();
                }}
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openDeleteAlert?.open && (
          <Modal
            isOpen={openDeleteAlert?.open}
            onClose={() => setOpenDeleteAlert({ open: false, data: null })}
            title="Delete Session"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-[30vw]"
            >
              <DeleteAlertContent
                content="Are you sure you want to delete this session?"
                onDelete={() => deleteSession(openDeleteAlert.data)}
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Dashboard;