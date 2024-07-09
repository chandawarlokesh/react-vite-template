import classNames from "classnames";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <div className={classNames(className, "flex items-center md:justify-start")}>
    <a
      href="#"
      className="bg-black shadow-sm shadow-white text-white font-bold text-xl p-4"
    >
      Logo
    </a>
  </div>
);

export default Logo;
