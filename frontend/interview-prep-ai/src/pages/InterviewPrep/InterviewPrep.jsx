import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { toast } from 'react-hot-toast'
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import AiResponsePreview from './components/AiResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';


const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session details", error);
    }
  }
  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true)
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question
      });

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate concept explanation");
      console.log("Error generating concept explanation", error);
    } finally {
      setIsLoading(false);
    }
  }
  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      // 1. OPTIMISTIC UPDATE - immediately update UI before API call
      setSessionData(prev => {
        if (!prev) return prev;

        // Toggle isPinned for the clicked question
        const updatedQuestions = prev.questions.map(q =>
          q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
        );

        // Return new state with sorted questions
        return {
          ...prev,
          questions: updatedQuestions.sort((a, b) => b.isPinned - a.isPinned)
        };
      });

      // 2. Make the actual API call
      await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));

      // 3. Optional: Final sync with server to ensure consistency
      fetchSessionDetailsById();

    } catch (error) {
      console.error("Error updating question pin status", error);
      toast.error("Failed to update pin status");

      // Revert if API call fails
      fetchSessionDetailsById();
    }
  }

  // add more questions to session
  const uploadMoreQuestions = async () => { 
    try{
      setIsUpdateLoader(true);

      // Call ai api to generate more questions
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      // should be array 
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        question: generatedQuestions,
      });

      if(response.data){
        toast.success("Added More Q&A!!")
        fetchSessionDetailsById()
      }

    }catch(error){
      if(error.response && error.response.data.message){
        setErrorMsg(error.response.data.message);
      }else{
        setErrorMsg("Somethink went wrong. please try again")
      }
    }finally{
      setIsUpdateLoader(false)
    }
  }

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();

    return () => {

    }
  }, [sessionId])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY") :
            ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold color-black">
          Interview Q & A
        </h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
            <AnimatePresence>
              {
                // Sort questions so pinned ones come first
                [...(sessionData?.questions || [])]
                  .sort((a, b) => (b.isPinned - a.isPinned)) // This will put pinned questions first
                  .map((data, index) => {
                    return (
                      <motion.div
                        key={data._id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 150,
                          delay: index * 0.1,
                          damping: 15,
                        }}
                        layout
                        layoutId={`question-${data._id}`}
                      >
                        <>
                          <QuestionCard
                            question={data?.question}
                            answer={data?.answer}
                            onLearnMore={() => generateConceptExplanation(data.question)}
                            isPinned={data?.isPinned}
                            onTogglePin={() => toggleQuestionPinStatus(data._id)}
                          />


                          {!isLoading &&
                            sessionData?.questions?.length == index + 1 && (
                              <div className="flex items-center justify-center mt-5">
                                <button
                                  className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                                  disabled={isLoading || isUpdateLoader}
                                  onClick={uploadMoreQuestions}
                                >
                                  {isUpdateLoader ? (
                                    <SpinnerLoader />
                                  ) : (
                                    <LuListCollapse className="text-lg" />
                                  )}{""}
                                  Load More
                                </button>
                              </div>
                            )}
                        </>
                      </motion.div>
                    )
                  })
              }
            </AnimatePresence>
          </div>
        </div>


        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title="Concept Explanation"
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}

            {isLoading && <SkeletonLoader />}

            {!isLoading && explanation && (
              <AiResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep