import { z } from 'zod'

const Ident = z.object({
    ident: z.string(),
    historisk: z.boolean(),
    gruppe: z.string(),
})

const Person = z.object({
    identer: z.array(Ident),
    navn: z.string().nullable(),
    fnr: z.string(),
})

export type Person = z.infer<typeof Person>
