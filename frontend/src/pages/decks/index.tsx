import { DeckType, SelectedPage } from "@/atoms/types";
import {
    HomeModernIcon,
    UserGroupIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Deck from "./Decks";

const decks: Array<DeckType> = [
    {
        icon: <HomeModernIcon className="h-6 w-5" />,
        title: "Unlock Your Academic Potential:",
        description:
            "Dive into a new era of learning with Intellicram, your personal study companion. Our innovative study and flashcard web app empowers you to grasp complex concepts effortlessly. Say goodbye to tedious note-taking and hello to a smarter way to study. Explore our vast database of curated content or let Intellicram's AI create personalized flashcards and quizzes tailored to your unique learning style. Transform the way you study, and watch your knowledge soar."
    },
    {
        icon: <UserGroupIcon className="h-6 w-5" />,
        title: "The AI Advantage: Unleashing the Power of Intellect:",
        description:
            "Welcome to Intellicram, where artificial intelligence meets academic excellence. Experience the transformative power of AI-driven learning as it adapts to your strengths and weaknesses. Intellicram doesn't just provide information; it understands how you learn best. Harness the incredible potential of machine learning to supercharge your study sessions. Let Intellicram be your guide in navigating the intricate world of knowledge, proving that the future of learning is intelligent."
    },
    {
        icon: <AcademicCapIcon className="h-6 w-5" />,
        title: "Beyond Memorization: Nurturing True Understanding:",
        description:
            "Intellicram goes beyond traditional flashcards; it fosters a deep understanding of your study material. Elevate your learning journey with our third section, where we emphasize comprehension over rote memorization. Intellicram doesn't just help you memorize facts; it guides you to truly understand the underlying concepts. Engage with immersive quizzes that challenge your critical thinking and take your knowledge to new heights. Join us in shaping a future where learning is not just about memorizing but about mastering."
    },
];

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
}

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const AboutUs = ({ setSelectedPage }: Props) => {
    return <section
        id="aboutus"
        className="mx-auto w-5/6 mb-20"
    >
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPage.Decks)}
        >
            <div className='w-full flex items-end justify-center p-12' style={{ background: 'radial-gradient(circle, rgba(145,229,246,1) 50%, rgba(255,255,255,1) 100%)' }}>
                <div className="mx-auto" >
                    <h2 className="text-3xl font-bold ">About IntelliCram</h2>
                </div>
            </div>
            {/* DECKS  */}
            <motion.div
                className=" mt-5 items-center justify-between gap-8 md:flex"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={container}
            >
                {decks.map((deck: DeckType) => (
                    <Deck
                        key={deck.title}
                        icon={deck.icon}
                        title={deck.title}
                        description={deck.description}
                        setSelectedPage={setSelectedPage}
                    />
                ))}
            </motion.div>
        </motion.div>
    </section >;
};

export default AboutUs;
