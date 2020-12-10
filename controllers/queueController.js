import axios from 'axios';

class QueueController {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(req, res) {
    return axios.get(`${this.baseUrl}/api/queue`, {headers: {'Content-Type': 'application/json'}})
      .then(request => res.status(200).json(request.data));
  }

  enqueue(req, res) {
    return axios.post(`${this.baseUrl}/api/queue`, req.data)
      .then(request => res.status(200).json(request.data));
  }
}
export default QueueController;
