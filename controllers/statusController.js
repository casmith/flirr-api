import axios from 'axios';

class StatusController {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(req, res) {
    return axios.get(`${this.baseUrl}/api/status`)
      .then(request => res.status(200).json(request.data));
  }
}
export default StatusController;
