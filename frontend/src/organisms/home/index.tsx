import { SelectedPage } from '@/atoms/types'
import useMediaQuery from '@/hooks/useMediaQuery';
import ActionButton from '@/atoms/ActionButton';
import HomepageText from "@/assets/HomePageText.png"
import AnchorLink from 'react-anchor-link-smooth-scroll';
import HomepageGraphic from "@/assets/HomepageGraphic.png"
import DesmosLogo from '@/assets/DesmosLogo.png'
import Apos from '@/assets/AoPS_Main_Logo_(1).png'
import xyz from "@/assets/xyz.png"
import { motion } from "framer-motion";

type Props = {
    setSeleectedPage: (value: SelectedPage) => void;
};

const Home = ({ setSeleectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

    return <section
        id="home"
        className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'
    >
        {/* IMAGE AND MAIN HEADER */}
        <div className='md:flex mx-auto w-5/6 items-center justify-center md:h-5/6'>
            {/* MAIN HEADER */}
            <div className='z-10 mt-32 md:basis-3/5'>
                {/* HEADINGS  */}
                <motion.div
                    className='md:-mt-20'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    transition={{duration: 1}}
                    variants={{
                        hidden: {opacity: 0, x:-50},
                        visible: {opacity: 1, x:0}
                    }}
                    >
                    <div className='relative'>
                        <div className='before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-intellicrambackground'>
                            <img src={HomepageText} alt="home-page-text" />
                        </div>
                    </div>
                    <p className='mt-8 text-sm'>
                        Unrivaled flash cards. Improve your learning using the latest in ai tools and architecture tommmy is a ho dick butt
                    </p>
                </motion.div>

                {/* ACTIONS */}
                <div className='mt-8 flex items-center gap-8'>
                    <ActionButton setSelectedPage={setSeleectedPage}>
                        Sign Up
                    </ActionButton>
                    <AnchorLink className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
                        onClick={() => setSeleectedPage(SelectedPage.ContactUs)}
                        href={`#${SelectedPage.ContactUs}`}
                    >
                        <p>Learn More</p>
                    </AnchorLink>
                </div>
            </div>
            {/* IMAGE */}
            <div className='flex basis-3/5 justify-center md:z-10
                            md:ml-40 md:mt-16 md:justify-items-end'>
                <img alt="home-pageGraphic" src={HomepageGraphic}></img>
            </div>
        </div>
        {/* SPONSORS  */}
        {isAboveMediumScreens && (
            <div className='h-[150px] w-full bg-primary-100 py-10'>
                <div className="mx-auto w-5/6">
                    <div className='flex w-10/12 items-center justify-between gap-8'>
                        <img alt="Apos" src={Apos} className="h-[100px]" />
                        <img alt="DesmosLogo" src={DesmosLogo} className="h-[100px]" />
                        <img alt="Xyz" src={xyz} className="h-[100px]" />
                    </div>
                </div>
            </div>
        )}
    </section>;
};

export default Home;
