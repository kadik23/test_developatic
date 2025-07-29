import { useForm, router } from "@inertiajs/react";
import { useNotifications } from "@/hooks/useNotifications";
import { useCallback } from "react";

export function usePasswordForm() {
    const { data, setData, processing, errors, reset } = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });
    const { showSuccess, showError } = useNotifications();

    const handleSubmit = useCallback(
        (values: any) => {
            const formData = {
                current_password: values.current_password,
                new_password: values.new_password,
                new_password_confirmation: values.new_password_confirmation,
            };
            router.put("/profile/password", formData, {
                onSuccess: () => {
                    showSuccess(
                        "Password changed successfully! Please remember your new password.",
                        "Password Updated"
                    );
                    reset();
                },
                onError: (errors) => {
                    const errorMessage =
                        errors?.message || "Failed to change password";
                    showError(errorMessage, "Password Change Failed");
                },
            });
        },
        [showSuccess, showError, reset]
    );

    return {
        data,
        setData,
        processing,
        errors,
        reset,
        handleSubmit,
    };
}
