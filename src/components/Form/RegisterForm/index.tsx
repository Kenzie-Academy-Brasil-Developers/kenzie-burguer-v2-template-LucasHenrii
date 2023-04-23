import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterFormValues, ZodRegister } from "../../Zod";
import { StyledParagraph } from "../../../styles/typography";

const RegisterForm = () => {
  const { HandleRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(ZodRegister),
  });

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    HandleRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        id="name"
        placeholder="Digite seu nome"
        {...register("name")}
      />
      {errors.name ? (
        <StyledParagraph fontColor="red">{errors.name.message}</StyledParagraph>
      ) : null}
      <Input
        type="email"
        id="email"
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
        id="passwors"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password ? (
        <StyledParagraph fontColor="red">
          {errors.password.message}
        </StyledParagraph>
      ) : null}
      <Input
        type="password"
        id="confirmPassword"
        placeholder="Digite a senha novamente"
        {...register("confirm")}
      />
      {errors.confirm ? (
        <StyledParagraph fontColor="red">
          {errors.confirm.message}
        </StyledParagraph>
      ) : null}
      <StyledButton $buttonSize="default" $buttonStyle="gray">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
