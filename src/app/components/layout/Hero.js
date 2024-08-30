import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br />
          is better <br />
          with a &nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, simple yet
          delicious joy in life.
        </p>
        <div className="flex text-sm">
          <div
            type="button"
            className="bg-primary flex justify-center items-center uppercase gap-2 text-white px-4 py-2 rounded-full"
          >
            <Link
              href="/menu"
              className="flex items-center justify-center whitespace-nowrap"
            >
              Order now
            </Link>
            <Right />
          </div>
          <button className="flex border-0 justify-center items-center gap-2 py-2 text-gray-600 font-semibold rounded-full ">
            Learn more
            <Right />
          </button>
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/pizza.png"
          fill
          style={{ objectFit: "contain" }}
          alt="pizza"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
