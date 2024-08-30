import SectionHeaders from "./SectionHeaders";
const ContactUs = () => {
  return (
    <section className="text-center my-8" id="contact">
      <SectionHeaders subHeader={"Don't hesitate"} mainHeader={"Contact us"} />
      <div className="mt-4">
        <a className="text-4xl underline text-gray-500" href="tel:+64758123123">
          +64 758 123 123
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
