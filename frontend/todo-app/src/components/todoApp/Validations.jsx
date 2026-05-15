import * as Yup from "yup"

export const todoSchema = Yup.object({
    todotitle: Yup.string().required("todo title is required")
})