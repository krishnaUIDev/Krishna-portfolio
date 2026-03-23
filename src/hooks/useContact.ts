import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface ContactData {
    name: string;
    email: string;
    message: string;
}

export const useContact = () => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendMessage = async (data: ContactData) => {
        setIsSubmitting(true);

        const promise = fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(async (res) => {
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || "Failed to send message");
            }
            return result;
        });

        toast.promise(promise, {
            loading: t("contact.form.submitting") || "Sending message...",
            success: t("contact.form.success") || "Message sent successfully!",
            error: (err) => err.message || "Failed to send message",
        });

        try {
            await promise;
            return { success: true };
        } catch (error) {
            console.error("Contact form error:", error);
            return { success: false, error };
        } finally {
            setIsSubmitting(false);
        }
    };

    return { sendMessage, isSubmitting };
};
