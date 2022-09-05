import axios from 'axios';

class QueueController {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(req, res) {
    return axios.get(`${this.baseUrl}/api/queue`)
      .then(request => res.status(200).json(request.data));
  }

  enqueue(req, res) {
    const data = req.body;
    return axios.post(`${this.baseUrl}/api/queue`, typeof data === 'string' ? JSON.parse(data) : data, 
      {headers: {'Content-Type': 'application/json'}})
      .then(request => res.status(200).json(request.data))
      .catch((e) => {
        console.error(JSON.stringify(e));
        res.sendStatus(500);
      });
  }

  dequeue(req, res) {
    const requestLine = req.params.request;
    return axios.delete(`${this.baseUrl}/api/queue/${requestLine}`)
      .then(request => res.status(200))
      .catch(e => {
        console.error(JSON.stringify(e));
        res.sendStatus(500);
      });
  }
}
export default QueueController;
