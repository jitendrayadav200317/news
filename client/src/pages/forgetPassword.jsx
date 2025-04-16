import { useState } from "react";
import { TextInput, Button, Container, Paper, Title, Text } from "@mantine/core";
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // setLoading(true);
        // setMessage("");

        // try {
        //     const { data } = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
        //     setMessage(data.message);
        // } catch (error) {
        //     setMessage(error.response?.data?.message || "Something went wrong");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <Container size={420} my={40}>
            <Title align="center">Forgot Password</Title>
            <Text align="center" size="sm" color="dimmed" mt="xs">
                Enter your email to receive a password reset link.
            </Text>

            <Paper withBorder shadow="md" p={30} mt={20} radius="md">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button fullWidth mt="md" type="submit" loading={loading}>
                        Send Reset Link
                    </Button>
                </form>

                {message && (
                    <Text color="green" size="sm" mt="sm" align="center">
                        {message}
                    </Text>
                )}
            </Paper>
        </Container>
    );
};

export default ForgetPassword;
