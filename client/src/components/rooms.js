import { Component } from "react";
export default class Rooms extends Component {
  render() {
    const rooms = [1, 2, 3, 4, 5]; //rooms
    return (
      <div className="flex flex-col w-full px-5 pt-2">
        {rooms.map((e) => {
          return (
            <button
            key={e}
              className="focus:bg-gray-700 focus:shadow-gray-700/20 hover:shadow-lg w-full hover:shadow-gray-800/20  text-white py-5 m-1 hover:bg-gray-800 rounded-md duration-200 outline-none bg-gray-800"
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
