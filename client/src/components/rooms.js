import { Component } from "react";
export default class Rooms extends Component {
  render() {
    const rooms = [1, 2, 3, 4, 5]; //rooms
    return (
      <div className="flex flex-col">
        {rooms.map((e) => {
          return (
            <button
              className="focus:bg-gray-800 focus:shadow-gray-800/20 hover:shadow-lg hover:shadow-gray-800/20  text-white py-4 m-1 hover:bg-gray-800 rounded-md duration-200 outline-none"
              onClick={() => {
                this.props.setRoom(e);
                this.props.chatUpdate(e);
              }}
            >
              {e}
            </button>
          );
        })}
      </div>
    );
  }
}
