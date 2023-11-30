import { SelectedPage } from '@/atoms/types'
import HomepageText from "@/assets/HomePageText.png"
import { motion } from "framer-motion";
import DecksPageGraphic from "@/assets/DecksPageGraphic.png"
import Button from '@/atoms/Button';
import { Link } from 'react-router-dom';


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const Home = ({ setSelectedPage }: Props) => {
    return <section
        id="home"
        className='gap-16 bg-gray-20 py-10 h-full md:pb-0'
    >
        {/* IMAGE AND MAIN HEADER */}
        <motion.div
            className='md:flex mx-auto w-5/6 items-center justify-center md:h-5/6'
            onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
        >
            {/* MAIN HEADER */}
            <div className='z-10 mt-32 md:basis-3/5'>
                {/* HEADINGS  */}
                <motion.div
                    className='md:-mt-20'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1 }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <div className='relative flex basis-3/5 justify-center'>
                        <img src={HomepageText} alt="home-page-text" />
                    </div>
                    <p className='mt-8 text-sm'>
                        Welcome to Intellicram, where learning becomes an exhilarating journey and intelligence meets innovation. Unlock your academic potential with our cutting-edge study and flashcard web app that redefines the way you absorb knowledge. Seamlessly blend personalized study materials curated by AI with our extensive content database. Experience the power of artificial intelligence, tailored to your unique learning style, as Intellicram transforms mundane study sessions into dynamic, engaging experiences. Beyond rote memorization, Intellicram fosters true understanding through immersive quizzes, guiding you towards mastery of your subjects. Elevate your learning experience and join us in shaping a future where intelligence and education converge seamlessly.
                    </p>
                </motion.div>

                {/* ACTIONS */}
                <motion.div
                    className='mt-8 flex items-center gap-8'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0 }
                    }}>
                    <Link
                        to="signup/new"

                    ><Button text="Sign UP" classes="bg-secondary-500 hover:bg-primary-500 hover:text-white" /></Link>

                    {/* Sign Up
                    </Submit> */}

                </motion.div>
            </div>
            {/* IMAGE */}
            <div className='flex basis-3/5 justify-center md:z-10
                            md:ml-40 md:mt-16 md:justify-items-end'>
                <img
                    className='mx-auto'
                    alt='decks-page-graphic'
                    src={DecksPageGraphic}
                />
            </div>
        </motion.div>

    </section>;
};

export default Home;
