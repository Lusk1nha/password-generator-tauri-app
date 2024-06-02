import { Controller, useFormContext } from "react-hook-form";

interface ISliderProps {
  name: string;
  label: string;
}

export function Slider(props: ISliderProps) {
  const { name, label } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onBlur, onChange } }) => (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full flex items-center justify-between">
            <label
              title={label}
              aria-label={label}
              className="text-label-light font-bold text-base md:text-lg"
            >
              {label}
            </label>

            <span
              title={value}
              aria-label={value}
              className="font-bold text-label-highlight text-2xl md:text-[32px]"
            >
              {value}
            </span>
          </div>

          <div className="w-full">
            <input
              className="w-full"
              type="range"
              min="0"
              max="20"
              onBlur={onBlur}
              onChange={(event) => {
                const asNumber = Number(event.target.value);
                onChange(asNumber);
              }}
              value={value}
              step="1"
            />
          </div>
        </div>
      )}
    />
  );
}
