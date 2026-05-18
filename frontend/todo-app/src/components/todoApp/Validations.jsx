import * as Yup from "yup"

export const todoSchema = Yup.object({
    task: Yup.string().required("task is required")
})