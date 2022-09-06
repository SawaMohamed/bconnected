import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";

const ChatContainer = () => {
  const [clickedUser, setClickedUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [user, setUser] = useState(null);
  const userId = cookies.UserId;
  // @desc      get all users & get current user
  const getUser = async () => {
    try {
      

      const activeUser = await axios.get(
        `http://localhost:8000/users/${userId}`
      );

      setUser(activeUser.data);
    } catch (error) {
      // console.error(error.message)
      console.log(error.message);
    }
  };

  useEffect(() => {
    return () => {
      getUser();
    };
  }, []);



  return (
    <div className="chat-container">
      <ChatHeader user={user} />

      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay
          matches={user?.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
};

export default ChatContainer;
