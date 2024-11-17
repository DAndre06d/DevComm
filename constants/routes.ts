const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    TAGS: (id: string) => `/profile/${id}`,
    QUESTIONS: (id: string) => `/questions/${id}`,
    ASK_QUESTION: "/ask-question",
};

export default ROUTES;
