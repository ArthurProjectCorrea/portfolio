"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { isValidEmail } from "@/lib/validation";

export interface ContactFormLabels {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  errors: {
    name: string;
    email: string;
    message: string;
  };
  successTitle: string;
  successDescription: string;
  errorTitle: string;
  errorDescription: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

type FormErrors = Partial<Record<keyof Omit<FormState, "subject">, string>>;

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = labels.errors.name;
    if (!form.email.trim() || !isValidEmail(form.email.trim())) {
      next.email = labels.errors.email;
    }
    if (form.message.trim().length < 10) next.message = labels.errors.message;
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("request_failed");

      toast.add({
        title: labels.successTitle,
        description: labels.successDescription,
        type: "success",
      });
      setForm(EMPTY_FORM);
      setErrors({});
    } catch {
      toast.add({
        title: labels.errorTitle,
        description: labels.errorDescription,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-[600px] flex-col gap-6 md:ml-auto"
    >
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="contact-name">{labels.nameLabel}</FieldLabel>
          <Input
            id="contact-name"
            value={form.name}
            placeholder={labels.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <FieldError errors={errors.name ? [{ message: errors.name }] : []} />
        </Field>

        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="contact-email">{labels.emailLabel}</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            placeholder={labels.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <FieldError
            errors={errors.email ? [{ message: errors.email }] : []}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-subject">
            {labels.subjectLabel}
          </FieldLabel>
          <Input
            id="contact-subject"
            value={form.subject}
            placeholder={labels.subjectPlaceholder}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, subject: event.target.value }))
            }
          />
        </Field>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="contact-message">
            {labels.messageLabel}
          </FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            value={form.message}
            placeholder={labels.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
          />
          <FieldError
            errors={errors.message ? [{ message: errors.message }] : []}
          />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={submitting} className="self-center">
        {submitting ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          <Send aria-hidden />
        )}
        {submitting ? labels.submitting : labels.submit}
      </Button>
    </form>
  );
}
