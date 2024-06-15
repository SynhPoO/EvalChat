///
// Message class
///
class Message {

    //Constructor
    constructor(sender, receiver, text) {
        this.sender = sender;
        this.receiver = receiver;
        this.text = text;
        this.timestamp = new Date().toLocaleString('fr', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
}

export default Message;