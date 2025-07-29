import { useForm, router } from "@inertiajs/react";
import { useNotifications } from "@/hooks/useNotifications";
import { useEffect } from "react";

export function useLoginForm(
    errors?: { email?: string; password?: string },
    status?: string
) {
    const { data, setData, processing } = useForm({
        email: "",
        password: "",
    });
    const { showSuccess, showError, showInfo } = useNotifications();

    const handleSubmit = (values: any) => {
        const formData = {
            email: values.email,
            password: values.password,
        };
        router.post("/login", formData, {
            onSuccess: () => {
                showSuccess(
                    "Welcome back! You have successfully logged in.",
                    "Login Successful"
                );
            },
            onError: (errors) => {
                if (errors.email) {
                    showError(errors.email, "Login Failed");
                } else if (errors.password) {
                    showError(errors.password, "Login Failed");
                } else {
                    showError(
                        "Invalid credentials. Please try again.",
                        "Login Failed"
                    );
                }
            },
        });
    };

    useEffect(() => {
        if (status === "info") {
            showInfo("You have been successfully logged out.", "Logged Out");
        }
    }, [status, showInfo]);

    return {
        data,
        setData,
        processing,
        handleSubmit,
        errors,
        status,
    };
}
