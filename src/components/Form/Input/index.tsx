import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef(
  ({ label, ...rest }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <div>
      <StyledInputContainer>
        {label ? <label>{label}</label> : null}
        <input ref={ref} {...rest} />
      </StyledInputContainer>
    </div>
  )
);

export default Input;
