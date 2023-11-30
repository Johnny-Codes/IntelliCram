import { SelectedPage, ReviewType} from "@/atoms/types";
import DesmosLogo from '@/assets/DesmosLogo.png'
import {motion} from "framer-motion"
import HText from "@/atoms/HText";
import Review from "./Review"




const reviews: Array<ReviewType> = [
    {
        name: " Weight Training Classes",
        description: "Lorem ipsum dolor sit amat, consectetur ",
        image: DesmosLogo
    },
    {
        name: " Booty Destoryer 101",
        description: "Lorem ipsum dolor sit amat, consectetur ",
        image: DesmosLogo
    },
    {
        name: " Brotein Management",
        description: "Lorem ipsum dolor sit amat, consectetur ",
        image: DesmosLogo
    },
    {
        name: " Weight Training Class4",
        description: "Lorem ipsum dolor sit amat, consectetur ",
        image: DesmosLogo
    },
]

type Props = {
    setSelectedPage: (value: SelectedPage)=> void
}

const OurReviews = ({setSelectedPage}: Props) => {
    return <section id="our-reviews" className="w-full bg-primary-100 py-40">
        <motion.div
        onViewportEnter={()=> setSelectedPage(SelectedPage.OurReviews)}>
            <motion.div
            className="mx-auto w-5/6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 }
            }}>
                <div className="md:w-3/5">
                    <HText>Our Reviews</HText>
                    <p className="py-5">
                        Our flashcards are much better than quizlets
                    </p>
                </div>
            </motion.div>
            <div className="mt-10 h-[355px] w-full overflow-x-auto overflow-y-hidden">
                <ul className="w-[2800px] whitespace-nowrap">
                    {reviews.map((item: ReviewType, index) => (
                        <Review 
                         key={`${item.name}-${index}`}
                         name={item.name}
                         description={item.description}
                         image={item.image}
                          />
                    ))}
                </ul>
            </div>
        </motion.div>
        </section>
    }

export default OurReviews