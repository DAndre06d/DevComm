const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    TAGS: (id: string) => `/profile/${id}`,
    ASK_QUESTION: "/ask-a-question",
};

export default ROUTES;
