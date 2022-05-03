import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

const client = axios.create();
Session.addAxiosInterceptors(client);

export const get = async (url: string) => {
    const response = await client.get(url);
    return response.data;
};

export const getCheckoutStatus = async (id: string) => {
    const session = await client.get(`/api/checkout-sessions/${id}`);
    console.log(session);
    return session.data.status;
};

export { client };
