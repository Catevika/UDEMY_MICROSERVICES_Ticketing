import axios from 'axios';

const buildClient = ({ req }) =>
{
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'test') {
    // We are on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
    // We are on the server
    return axios.create({
      baseURL: 'http://www.udemy-microservices-ticketing.xyz/',
      headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};

export default buildClient;
