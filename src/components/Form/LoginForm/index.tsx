import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../../contexts/UserContext";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { TLoginFormValues, ZodLogin } from "../../Zod";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledParagraph } from "../../../styles/typography";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(ZodLogin),
  });

  const { HandleLogin } = useContext(UserContext);

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    HandleLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type="email"
        id="login"
        placeholder="Digite seu email"
        {...register("email")}
      />
      {errors.email ? (
        <StyledParagraph fontColor="red">
          {errors.email.message}
        </StyledParagraph>
      ) : null}
      <Input
        type="password"
        id="senha"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password ? (
        <StyledParagraph fontColor="red">
          {errors.password.message}
        </StyledParagraph>
      ) : null}
      <StyledButton $buttonSize="default" $buttonStyle="green">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
