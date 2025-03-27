export const token = process.env.SANITY_API_READ_TOKEN || 'skxTMMiiVpssZaQpnzeZmNSaaELbuP7au1o8FHlrm7OdevOx23TOyFIvdQO2rUlQ9N1K89Gg7tupGdyflBOAE7qmSo9qKyVCDb7gmHaXC5epTI9R48No1DPdFGyt5QhvZqJqVkB2QowyJZazbmtqmY5vUsynfrFGAyl9z0nTZUzG2jvma0kB'

if (!token) {
    throw new Error('Missing SANITY_API_READ_TOKEN')
}