import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROIJECT_ID,
    dataset: 'production',
    apiVersion:'v1',
    token: process.env.NEXT_PUBLIC_SANITY_PROIJECT_TOKEN,
    useCdn: false ,
})