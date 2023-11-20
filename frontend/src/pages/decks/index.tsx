import HText from "@/atoms/HText";
import { DeckType, SelectedPage } from "@/atoms/types";
import {
    HomeModernIcon,
    UserGroupIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Deck from "./Decks";
import ActionButton from "@/atoms/ActionButton";
import DecksPageGraphic from "@/assets/DecksPageGraphic.png"

const decks: Array<DeckType> = [
    {
        icon: <HomeModernIcon className="h-6 w-5" />,
        title: "State of the Art Facilities",
        description:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfssdfa"
    },
    {
        icon: <UserGroupIcon className="h-6 w-5" />,
        title: "School sucks",
        description:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfssdfa"
    },
    {
        icon: <AcademicCapIcon className="h-6 w-5" />,
        title: "Mydegree is worthless",
        description:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfssdfa"
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

const Decks = ({ setSelectedPage }: Props) => {
    return <section
        id="decks"
        className="mx-auto min-h-full w-5/6 py-20"
    >
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPage.Decks)}
        >
            {/* HEADER  */}
            <motion.div
                className="md:my-5 md:w-3/5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 }
                }}
            >
                <HText>Your Flashcards</HText>
                <p className="my-5 text-sm">
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaadaaiaaacaaaakaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
            </motion.div>

            {/* DECKS  */}
            <motion.div
                className="mt-5 items-center justify-between gap-8 md:flex"
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

            {/* GRAPHICS AND DESCRIP  */}
            <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                {/* GRAPHIC  */}
                <img
                    className='mx-auto'
                    alt='decks-page-graphic'
                    src={DecksPageGraphic}
                />

                {/* DESCRIP  */}
                <div>
                    {/* TITLE  */}
                    <div className="relative">
                        <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1 }}
                                variants={{
                                    hidden: { opacity: 0, x: 100 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                            >
                                <HText>
                                    Look at all them {' '}
                                    <span className="text-primary-500">DECKS</span>
                                </HText>
                            </motion.div>
                        </div>
                    </div>
                    {/* DESCRIPT  */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <p className="my-5">
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                        </p>
                        <p className="mb-5">
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                        </p>
                    </motion.div>
                    {/* BUTTON  */}
                    <div className="relative mt-16">
                        {/* SPARKLES NOT WORKING  */}
                        <div className="before:absolute before:-bottom-40 before:right-40 before:z-[-1] before:content-sparkles">
                            <ActionButton setSelectedPage={setSelectedPage}>
                                Sign Up
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </section >;
};

export default Decks
