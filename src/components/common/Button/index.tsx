import * as S from "./styles";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <S.CustomButton onClick={onClick} type={type} disabled={disabled}>
      {text}
    </S.CustomButton>
  );
};

export default Button;
