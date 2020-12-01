import axios from 'axios';

class QueueController {
    static get(req, res) {
      return axios.get("http://localhost:8585/api/queue")
        .then(request => res.status(200).json(request.data));
    }
}
export default QueueController;
