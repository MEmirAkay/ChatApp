import { Component } from "react";
export default class Message extends Component {
  render() {
    return (
      <>
        <input
          className="bg-slate-600 basis-4/5 m-2 text-left px-4  p-1 font-extralight text-lg duration-300  rounded-lg outline-none text-white"
          type="text"
          placeholder="Bir mesaj yazın"
          value={this.props.message}
          onChange={(e) => {
            this.props.setMessage(e.target.value);
          }}
        />
        <button
          className="basis-1/5 m-2 hover:shadow-lg hover:shadow-green-500/30 text-white text-center p-2 font-extralight text-lg duration-300 rounded-lg bg-green-400"
          onClick={() => {
            this.props.sendMessage();
            this.props.setMessage("");
          }}
        >
          Send
        </button>
      </>
    );
  }
}
