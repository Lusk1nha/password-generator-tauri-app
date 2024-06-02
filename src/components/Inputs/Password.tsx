import { useState } from "react";
import { CopyIcon } from "../../shared/assets/images/CopyIcon";

interface IPasswordProps {
  password: string;
  handleCopy: (password: string) => Promise<void>;
}

export function Password(props: IPasswordProps) {
  const { password, handleCopy } = props;

  const [isCopied, setIsCopied] = useState(false);

  async function copyPassword() {
    await handleCopy(password);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <div className="bg-field-light w-full h-16 md:h-20 flex items-center p-4 md:px-8">
      <input
        className="bg-transparent w-full h-full font-bold text-password-light text-2xl md:text-[32px] cursor-text"
        type="text"
        value={password}
        placeholder="P4$5W0rD!"
        disabled
      />

      <div className="flex items-center gap-4">
        {isCopied ? (
          <p className="text-copy_button-light font-bold text-base md:text-lg uppercase">
            Copied
          </p>
        ) : null}

        <button
          type="button"
          className="w-[17px] h-5 fill-copy_button-light hover:fill-white flex items-center justify-center transition-colors disabled:opacity-15"
          onClick={copyPassword}
          disabled={password.length === 0}
        >
          <CopyIcon />
        </button>
      </div>
    </div>
  );
}
