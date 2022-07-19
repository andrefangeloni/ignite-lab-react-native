import { Button as NBButton, Heading, IButtonProps } from 'native-base';

type ButtonProps = IButtonProps & {
  title: string;
};

export const Button = ({ title, ...rest }: ButtonProps) => (
  <NBButton
    bg="green.700"
    h={14}
    fontSize="sm"
    rounded="sm"
    _pressed={{
      bg: 'green.500',
    }}
    {...rest}
  >
    <Heading color="white" fontSize="sm">{title}</Heading>
  </NBButton>
);
