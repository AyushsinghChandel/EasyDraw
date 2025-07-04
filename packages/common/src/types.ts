import {z} from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20).email(),
    password: z.string().min(8,"Password must contain 8 characters").refine(
        (password) => /[A-Z]/.test(password),{
            message: "Password must contain atleast one captial letter"
        }
    ).refine(
        (password)=> /[!@#$%^&*(),.?":{}|<>]/.test(password),{
            message: "Password must contain atleast one special character"
        }
    ),
    name: z.string().min(3).max(20)
});

export const SigninSchema = z.object({
    username: z.string().min(3).max(20).email(),
    password: z.string().min(8,"Password must contain 8 characters").refine(
        (password) => /[A-Z]/.test(password),{
            message: "Password must contain atleast one captial letter"
        }
    ).refine(
        (password)=> /[!@#$%^&*(),.?":{}|<>]/.test(password),{
            message: "Password must contain atleast one special character"
        }
    )
});

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
});