import { useRef, useState } from "react";
import { ChangeEvent } from "react";
import { IconType } from "react-icons";

export interface TextInputElement {
  lable?: string;
  value?: string | number;
  onChangeHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClearHandler?: () => void;
  leadingIcon?: string | IconType | Element | any;
  trailingIcon?: string | IconType | Element | any;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

const index = ({
  lable = "input",
  value,
  onChangeHandler,
  onClearHandler,
  trailingIcon,
  helperText,
  disabled = false,
  required = false,
  className,
  rows = 3,
}: TextInputElement) => {
  const inputElement = useRef<HTMLTextAreaElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const focusInputElement = () => inputElement.current?.focus();
  /**
   * Clears the input field by updating the state on button click.
   */
  return (
    // Container
    <div className="flex flex-col gap-2 min-w-60">
      <span className="capitalize font-semibold tracking-widest">{lable}:</span>
      {/* Activation indicator */}
      <span
        onClick={focusInputElement}
        className={`rounded-lg px-4 py-2 flex relative outline outline-1 outline-slate-300 focus-within:outline-blue-400 ${className}`}
      >
        {/*  Leading icon (optional) */}
        {/* {leadingIcon && <span>{leadingIcon}</span>} */}
        {/* Label text */}
        {/* <span
          className={`absolute ${
            isFocus || value ? "-top-0" : "top-1/2"
          } left-4 -translate-y-1/2 transition-all`}
        >
          {lable}
        </span> */}
        {/* Input text */}
        <textarea
          ref={inputElement}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChangeHandler}
          disabled={disabled}
          required={required}
          rows={rows}
          className="flex-grow outline-none bg-transparent"
          name={lable}
        />
        {/* Trailing icon (optional) */}
        {trailingIcon && (
          <span
            className="m-2 cursor-pointer"
            onClick={() => onClearHandler!()}
          >
            {trailingIcon}
          </span>
        )}
      </span>
      {/* Helper text (optional) */}
      {helperText && <span>{helperText}</span>}
    </div>
  );
};

export default index;
