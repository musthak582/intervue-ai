const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated
}) => {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="container mx-auto px-10 md:px-0">
        <div className="min-h-[200px] py-8 flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div className="">
                  <h2 className="text-xl sm:text-2xl font-medium">{role}</h2>
                  <p className="text-sm text-medium text-gray-900 mt-1">{topicsToFocus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <div className="text-xs sm:text-sm font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience > 1 ? "years" : "year"}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm sm:text-base">
            {description}
          </div>
        </div>

        <div className="w-full md:w-1/3 h-auto flex items-center justify-end overflow-hidden absolute top-0 right-0 bottom-0">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1" />
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2" />
          <div className="w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3" />
          <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob4" />
        </div>
      </div>
    </div>
  )
}

export default RoleInfoHeader;