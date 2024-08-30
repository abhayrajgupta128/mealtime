import SectionHeaders from "./SectionHeaders";

const AboutUs = () => {
  return (
    <section className="text-center my-16" id="about">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
      <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
        <p>
          Welcome to Mealtime! At Mealtime, we’re passionate about making your
          dining experience as effortless and enjoyable as possible. Our mission
          is to connect you with a wide variety of delicious meals from your
          favorite local restaurants, right at your fingertips. Whether you're
          craving a quick lunch, a hearty dinner, or a special treat, Mealtime
          is here to deliver your food cravings directly to your door. culpa qui
          officia deserunt mollit anim id est laborum
        </p>
        <p>
          Our user-friendly platform allows you to browse through an extensive
          selection of restaurants and cuisines. With just a few clicks, you can
          place your order and track its progress in real-time. From classic
          comfort foods to gourmet delicacies, we partner with a diverse range
          of eateries to ensure you have access to the best options in town.
          Enjoy seamless payment options and timely deliveries, all tailored to
          fit your busy lifestyle.
        </p>
        <p>
          At Mealtime, we value the satisfaction of our customers and are
          committed to providing top-notch service. Join our growing community
          of food enthusiasts and experience the convenience and variety that
          only Mealtime can offer. We’re here to make every meal a memorable
          one, one delivery at a time.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
