export const apiUrl = import.meta.env.VITE_APP_API_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  IMAGE:{
    UPLOAD_IMAGE: "/api/auth/upload-image"
  },
  AI:{
    GENERATE_QUESTIONS: "/api/ai/generate-question",
    GENERATE_EXPLANATION: "/api/ai/generate-explanation"
  },
  SESSION:{
    CREATE: "/api/sessions/create",
    GET_ALL:"/api/sessions/my-sessions",
    GET_ONE: (id)=>`/api/sessions/${id}`,
    DELETE: (id)=>`/api/sessions/${id}`
  },
  QUESTION:{
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id)=>`/api/questions/${id}/pin`,
    UPDATE_NODE: (id) =>`/api/questions/${id}/note`,
  }
}