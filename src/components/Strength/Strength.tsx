import classNames from "classnames";
import {
  generateStrengthRate,
  generateTailwindBasedOnRate,
  generateTextBasedOnRate,
} from "../../shared/helpers/password-helper";

interface IStrengthProps {
  password: string;
}
export function Strength(props: IStrengthProps) {
  const { password } = props;

  const { level, score } = generateStrengthRate(password);

  const text = generateTextBasedOnRate(level);
  const tailwind = generateTailwindBasedOnRate(level);

  return (
    <section className="bg-strength-background-light h-14 md:h-[72px] flex items-center justify-between py-[13px] px-4  flex-wrap">
      <h4 className="text-strength-text-light text-base md:text-lg font-bold uppercase">
        STRENGTH
      </h4>

      <div className="flex gap-4">
        <h4 className="text-strength-level-light text-lg md:text-2xl font-bold uppercase">
          {text}
        </h4>

        <div className="flex gap-2">
          <div
            className={classNames(
              "w-2.5 h-7",
              score > 0 ? tailwind : "border-2 border-white"
            )}
          />
          <div
            className={classNames(
              "w-2.5 h-7",
              score >= 5 ? tailwind : "border-2 border-white"
            )}
          />
          <div
            className={classNames(
              "w-2.5 h-7",
              score >= 10 ? tailwind : "border-2 border-white"
            )}
          />
          <div
            className={classNames(
              "w-2.5 h-7",
              score > 15 ? tailwind : "border-2 border-white"
            )}
          />
        </div>
      </div>
    </section>
  );
}
