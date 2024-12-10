"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    FieldValues,
    useForm,
    DefaultValues,
    SubmitHandler,
    Path,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types/global";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

interface AuthFormProps<T extends FieldValues> {
    schema: ZodType<T>;
    defaultVal: T;
    onSubmit: (data: T) => Promise<ActionResponse>;
    formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
    schema,
    defaultVal,
    formType,
    onSubmit,
}: AuthFormProps<T>) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: defaultVal as DefaultValues<T>,
    });
    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = (await onSubmit(data)) as ActionResponse;
        if (result.success) {
            toast({
                title: "Success",
                description:
                    formType === "SIGN_IN"
                        ? "Signed in successfully"
                        : "Signed up successfully",
            });
            router.push(ROUTES.HOME);
        } else {
            toast({
                title: `Error ${result?.status}`,
                description: result?.error?.message,
                variant: "destructive",
            });
        }
    };

    const buttonText = formType === "SIGN_IN" ? "Sign in" : "Sign up";
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mt-10 space-y-6"
            >
                {Object.keys(defaultVal).map((field) => (
                    <FormField
                        key={field}
                        control={form.control}
                        name={field as Path<T>}
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-2.5">
                                <FormLabel className="paragraph-medium  text-dark400_light700">
                                    {field.name === "email"
                                        ? "Emal Address"
                                        : field.name
                                              .charAt(0)
                                              .toLocaleUpperCase() +
                                          field.name.slice(1)}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        required
                                        type={
                                            field.name === "password"
                                                ? "password"
                                                : "text"
                                        }
                                        {...field}
                                        className="paragraph-regular background-light900_dark300 light-border-2 text_dark300_light700 no-focus min-h-12 rounded-1.5 border"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
                >
                    {form.formState.isSubmitting
                        ? buttonText === "Sign in"
                            ? "Signing In...."
                            : "Signing Up...."
                        : buttonText}
                </Button>
                {formType === "SIGN_IN" ? (
                    <p>
                        Don't have an account?{" "}
                        <Link
                            href={ROUTES.SIGN_UP}
                            className="paragraph-semibold primary-text-gradient"
                        >
                            Sign up
                        </Link>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <Link
                            href={ROUTES.SIGN_IN}
                            className="paragraph-semibold primary-text-gradient"
                        >
                            Sign in
                        </Link>
                    </p>
                )}
            </form>
        </Form>
    );
};

export default AuthForm;
