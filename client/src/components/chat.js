import { Component } from "react";
export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        message: {
          "justify-content": "start",
        },
      },
    };
  }

  render() {
    return (
      <div className="flex flex-col max-h-screen px-5 overflow-auto">
        {this.props.chat.map((e) => {
            
            
          return (
            <div
              className="flex w-full"
              style={this.state.style.message}
            >
              <div className="flex flex-col w-min h-min py-2 my-2 px-4 text-white  bg-slate-700 rounded-md shadow-lg">
                <div className=" hidden">{e._id} </div>
                <div className="text-start font-semibold text-sm text-red-400">
                  {e.username}
                </div>
                <div className="flex flex-row space-x-3">
                  <div className="text-center">{e.message}</div>
                  <div className="text-xs text-slate-400 text-end pt-2">
                    {e.time.substr(0, 5)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
