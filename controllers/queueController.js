import axios from 'axios';

class QueueController {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(req, res) {
    return axios.get(`${baseUrl}/api/queue`)
      .then(request => res.status(200).json(request.data));
  }
}
export default QueueController;
