import { auth, signOut } from "@/auth";

const Home = async () => {
    const session = await auth();
    console.log(session);
    return (
        <>
            <h1 className="h1-bold background-lightandDark">
                Welcome to world of next js
            </h1>
        </>
    );
};

export default Home;
