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
    const data = req.data;
    return axios.post(`${this.baseUrl}/api/queue`, typeof data === 'string' ? JSON.parse(data) : data, 
      {headers: {'Content-Type': 'application/json'}})
      .then(request => res.status(200).json(request.data));
  }
}
export default QueueController;
