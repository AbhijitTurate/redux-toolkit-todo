import { TextInput, Button } from "@contentstack/venus-components"

function Login() {
    return <>
        <TextInput
            maxLength={20}
            placeholder="Enter username..."
            showCharacterCount
            type="text"
            width="large"
        />
        <TextInput
            autoFocus
            canShowPassword
            placeholder="Enter password..."
            type="password"
            width="medium"
        />
        <>
            <span>
                <Button
                    buttonType="primary"
                    icon="Send"
                    iconAlignment={undefined}
                    onClick={function noRefCheck() { }}
                >
                    Log in
                </Button>
            </span>
        </>
    </>
}

export default Login;