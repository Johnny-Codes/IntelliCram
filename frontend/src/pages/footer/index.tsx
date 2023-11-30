const Footer = () => {
  return <footer className="bg-primary-100 pt-16">
    <div className="justify-context mx-auto w-5/6 md:flex">
        <div className="mt-16 basis-1/4 md:mt-0">
            <h4 className="font-bold">Creators</h4>
            <p className="py-2"><i className="fa fa-linkedin-square mr-2" /><a href="https://www.linkedin.com/in/edwin-madrigal" target="_blank">Edwin Madrigal</a></p>
            <p className="py-2"><i className="fa fa-linkedin-square mr-2" /><a href="https://www.linkedin.com/in/john-hainam-nguyen" target="_blank">John Hainam Nguyen</a></p>
            <p className="py-2"><i className="fa fa-linkedin-square mr-2" /><a href="https://www.linkedin.com/in/pmjohns" target="_blank">Paul Johns</a></p>
        </div>
        <div className="mt-16 basis-1/2 md:mt-0 text-center">
            <p className="my-5">
                Made with love &#10084;&#65039; by a team of 3 developers in 2 weeks.
            </p>
        </div>
        <div className="basis-1/4 text-right">
        <h4 className="font-bold">Contact Us</h4>
            <p className="my-5">intellicram@gmail.com</p>
        </div>
    </div>
    <div className="flex justify-center">
        <p>(C) Intellicram All Rights Reserved</p>
    </div>
  </footer>
}

export default Footer