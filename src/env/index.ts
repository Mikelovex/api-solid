import 'dotenv/config'

import {z} from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(8080),
})


const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('Error in env file');
    
    throw new Error('Error in env file')
}


export const env = _env.data