import Logo from "@/assets/Logo.png"

type Props = {}

const Footer = () => {
  return <footer className="bg-primary-100 py-16">
    <div className="justify-context mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
            <img src={Logo} alt="logo" className="h-[150px]"/>
            <p className="my-5">
                Lorem ipsum etladlk asdkljdaj adjaldj adufajdklfj adfl asdjlfkjasdluogj ajad fdja lfjdas iopjdfklaf ja
            </p>
            <p> Intellicram All Rights Reserved</p>

        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
            <h4 className="font-bold">Links</h4>
            <p className="my-5">Massa orci senectus</p>
            <p className="my-5">Et gravid id et etiam</p>
            <p>Ullamcorper vivamus</p>
        </div>
        <div className="mt-16">
        <h4 className="font-bold">Contact Us</h4>
            <p className="my-5">intellicram@gmail.com</p>
            <p>(333) 425-6825</p>
        </div>
    </div>
  </footer>
}

export default Footer