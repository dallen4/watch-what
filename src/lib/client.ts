import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

const client = axios.create();
Session.addAxiosInterceptors(client);

export const getSession = async () => {
    const session = await client.get('/api/me');
    console.log(session);
    return session.data;
};

export const getCheckoutStatus = async (id: string) => {
    const session = await client.get(`/api/checkout-sessions/${id}`);
    console.log(session);
    return session.data.status;
};

export { client };
