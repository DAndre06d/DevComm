import { auth, signOut } from "@/auth";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
const questions = [
    {
        _id: "1",
        title: "How to learn React?",
        description: "I want to learn React, can anyone help me?",
        tags: [
            { _id: "1", name: "React" },
            { _id: "2", name: "Javascript" },
        ],
        author: { _id: "2", name: "John Doe" },
        upVotes: 10,
        answers: 5,
        views: 100,
        createdAt: new Date(),
    },
    {
        _id: "2",
        title: "How to learn Javascript?",
        description: "I want to learn Javascript, can anyone help me?",
        tags: [
            { _id: "1", name: "React" },
            { _id: "2", name: "Javascript" },
        ],
        author: { _id: "1", name: "John Doe" },
        upVotes: 10,
        answers: 5,
        views: 100,
        createdAt: new Date(),
    },
];
interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParamsProps) => {
    const { query = "" } = await searchParams;
    const filteredQuestions = questions.filter((question) =>
        question.title.toLocaleLowerCase().includes(query?.toLocaleLowerCase())
    );
    return (
        <>
            <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Button
                    className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
                    asChild
                >
                    <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
                </Button>
            </section>
            <section className="mt-11">
                <LocalSearch
                    route="/"
                    imgSrc={"/icons/search.svg"}
                    placeHolder={"Search question..."}
                    otherClass="flex-1"
                />
            </section>
            {/* Home Filter */}
            <div className="mt-10 flex w-full flex-col gap-6 ">
                {filteredQuestions.map((question) => (
                    <h1 key={question._id}>{question.title}</h1>
                ))}
            </div>
        </>
    );
};

export default Home;
