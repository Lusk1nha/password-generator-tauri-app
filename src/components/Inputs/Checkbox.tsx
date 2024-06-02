import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { CheckIcon } from "../../shared/assets/images/CheckIcon";

interface ICheckboxProps {
  name: string;
  text: string;
}

export function Checkbox(props: ICheckboxProps) {
  const { name, text } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onBlur, onChange } }) => {
        const isChecked = value === true;

        return (
          <button
            aria-label={text}
            title={text}
            type="button"
            className="group flex items-center gap-5"
            onClick={() => onChange(!value)}
            onBlur={onBlur}
          >
            <div
              className={classNames(
                "w-5 h-5 flex items-center justify-center stroke-checkbox-checked",
                isChecked
                  ? "bg-checkbox-active_background"
                  : "border-2 border-checkbox-border group-hover:border-checkbox-active_background"
              )}
            >
              {isChecked ? <CheckIcon /> : null}
            </div>

            <div className="text-base md:text-lg font-bold">{text}</div>
          </button>
        );
      }}
    />
  );
}
