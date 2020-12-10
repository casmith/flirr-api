import axios from 'axios';

class ServerController {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(req, res) {
    return axios.get(`${this.baseUrl}/api/server/users`)
      .then(request => res.status(200).json(request.data));
  }
}
export default ServerController;
