import axios from 'axios';

class QueueController {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(req, res) {
    return axios.get(`${this.baseUrl}/api/queue`)
      .then(request => res.status(200).json(request.data));
  }
}
export default QueueController;
