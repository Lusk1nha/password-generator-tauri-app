import { FormProvider, useForm } from "react-hook-form";
import { Password } from "./Inputs/Password";
import { Slider } from "./Inputs/Slider";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./Inputs/Checkbox";
import { Strength } from "./Strength/Strength";
import { ArrowRightIcon } from "../shared/assets/images/ArrowRightIcon";

import { clipboard, invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";

const FormSchemaValidation = z
  .object({
    character_length: z.number().min(1).max(20),
    include_uppercase: z.boolean(),
    include_lowercase: z.boolean(),
    include_numbers: z.boolean(),
    include_symbols: z.boolean(),
  })
  .refine((data) => {
    const {
      include_uppercase,
      include_lowercase,
      include_numbers,
      include_symbols,
    } = data;

    return (
      include_uppercase ||
      include_lowercase ||
      include_numbers ||
      include_symbols
    );
  }, "At least one option must be selected");

type FormSchema = z.infer<typeof FormSchemaValidation>;

const defaultValues: FormSchema = {
  character_length: 10,
  include_uppercase: true,
  include_lowercase: true,
  include_numbers: true,
  include_symbols: false,
};

function App() {
  const [password, setPassword] = useState<string>("");

  const formInstance = useForm<FormSchema>({
    resolver: zodResolver(FormSchemaValidation),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formInstance;

  /**
   * Function to generate a password based on the form values
   * @param values Form values to generate the password
   */
  async function onSubmit(values: FormSchema) {
    try {
      const options = FormSchemaValidation.parse(values);
      const json = JSON.stringify(options);

      const password = await invoke<string>("generate_password", {
        data: json,
      });

      setPassword(password);
    } catch (error) {
      throw new Error("Failed to generate password");
    }
  }

  /**
   * Function to copy the generated password to the clipboard
   * @param password
   */
  async function handleCopyPasswordToClipboard(password: string) {
    try {
      let permissionGranted = await isPermissionGranted();
      if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === "granted";
      }

      if (permissionGranted) {
        sendNotification({
          title: "Password Generated",
          body: `Your password was copied to the clipboard.`,
        });
      }

      clipboard.writeText(password);
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormProvider {...formInstance}>
      <div className="bg-screen-light text-white w-full min-h-screen flex items-start md:items-center justify-center">
        <div className="max-w-[540px] w-full flex flex-col items-center pt-16 md:pt-0 px-4 md:px-8 gap-4">
          <header>
            <h3
              title="Password Generator"
              aria-label="Password Generator"
              className="text-title-light text-base md:text-2xl font-bold"
            >
              Password Generator
            </h3>
          </header>

          <main className="w-full">
            <form
              className="flex flex-col grow gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset>
                <Password
                  password={password}
                  handleCopy={handleCopyPasswordToClipboard}
                />
              </fieldset>

              <div className="bg-field-light w-full flex flex-col p-4 md:p-8 gap-8">
                <fieldset>
                  <Slider name={"character_length"} label="Character Length" />
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                  <Checkbox
                    name="include_uppercase"
                    text="Include Uppercase Letters"
                  />

                  <Checkbox
                    name="include_lowercase"
                    text="Include Lowercase Letters"
                  />

                  <Checkbox name="include_numbers" text="Include Numbers" />

                  <Checkbox name="include_symbols" text="Include Symbols" />
                </fieldset>

                <Strength password={password} />

                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full h-14 md:h-16 bg-generate_button-background-light disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-25 flex items-center justify-center gap-6 border border-transparent hover:border-generate_button-background-light hover:bg-transparent font-bold text-base md:text-lg text-generate_button-text-light hover:text-generate_button-background-light fill-generate_button-text-light hover:fill-generate_button-background-light uppercase px-4 py-[18px] transition-colors"
                    disabled={!isValid}
                  >
                    GENERATE
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
