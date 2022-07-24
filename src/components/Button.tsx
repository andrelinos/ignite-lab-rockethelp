import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
    variant?: string;
};

export function Button({ title, variant, ...rest }: Props) {
    return (
        <ButtonNativeBase
            bg={variant === 'ghost' ? 'transparent' : 'green.700'}
            h={14}
            px={variant && 0}
            fontSize="sm"
            rounded="sm"
            variant={variant ? variant : 'solid'}
            _pressed={
                variant === 'ghost'
                    ? { bg: 'transparent' }
                    : { bg: 'green.500' }
            }
            {...rest}
        >
            <Heading
                color={variant === 'ghost' ? 'green.700' : 'white'}
                fontSize="sm"
            >
                {title}
            </Heading>
        </ButtonNativeBase>
    );
}
