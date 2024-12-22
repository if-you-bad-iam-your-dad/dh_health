class ChatService {
  constructor() {
    this.ws = null;
    this.callbacks = new Map();
  }

  connect() {
    this.ws = new WebSocket(process.env.REACT_APP_WS_URL || 'ws://localhost:5000');
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.callbacks.get('message')?.(message);
    };

    this.ws.onclose = () => {
      setTimeout(() => this.connect(), 1000);
    };
  }

  onMessage(callback) {
    this.callbacks.set('message', callback);
  }

  sendMessage(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    this.ws?.close();
  }
}

export default new ChatService();
