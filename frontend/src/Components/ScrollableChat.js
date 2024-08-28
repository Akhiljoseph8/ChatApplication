import { Avatar, Box, Divider, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import Toast from "./Toast";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { useState } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

import styled from "styled-components";



const ScrollFeed = styled(ScrollableFeed)`
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ScrollableChat = ({ messages, fetchAgain,
  setFetchAgain,
  children,
  fetchMessages,setMessages }) => {
  const { user, selectedChat,setSelectedChat,setChat,setUser } = ChatState();
  const [toastShow, setToastShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const deleteMessage=async(id,chat)=>{
    console.log(selectedChat)
   
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const d  = await axios.delete(`/api/message/${id}`, config);
      const { data } = await axios.get(
        `/api/chat/${chat._id}`,
        config
        
      );
      if(d){
    
       
      console.log(d)
        setToastShow(true);
        setToastText("message deleted");
        setToastIcon("success");
        setTimeout(() => {
          setToastShow(false);
          setToastText("");
          setToastIcon("");
        }, 1500);
       
         setSelectedChat(selectedChat)
        setFetchAgain(fetchAgain);
        setLoading(false);
        setMessages(messages)
     console.log(selectedChat)
     console.log(messages)
      }
    }catch{
  
    }
  }
 
  return (
    <ScrollFeed>
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.firstname + " " + m.sender.lastname}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt={
                    selectedChat.isGroupChat
                      ? isSameUser(messages, m, i)
                        ? 3
                        : 42
                      : isSameUser(messages, m, i)
                      ? 3
                      : 43
                  }
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.firstname + " " + m.sender.lastname}
                  src={m.sender.pic}
                  bg="#4FB2E5"
                />
              </Tooltip>
            )}
            <Box
              bg={m.sender._id === user._id ? "#b3d1f8" : "#7eaff0"}
              borderRadius="10px"
              p="5px 15px"
              maxWidth={{ base: "80%", md: "60%" }}
              wordBreak="break-word"
              marginLeft={isSameSenderMargin(messages, m, i, user._id)}
              marginTop={
                selectedChat.isGroupChat
                  ? isSameUser(messages, m, i)
                    ? 3
                    : 8
                  : isSameUser(messages, m, i)
                  ? 3
                  : 10
              }
            >
              {m.sender._id !== user._id && selectedChat.isGroupChat && (
                <Text
                  fontSize={{ base: "10px", md: "12px" }}
                  textAlign="start"
                  mb={1}
                  color="white"
                  fontWeight={600}
                >
                  {m.sender.firstname + " " + m.sender.lastname}
                </Text>
              )}
      
              {m.content.substring(0, 5) === "Image" ? <img
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:8000/uploads/${m.content}`}
                                
                                alt="img"
                            />: m.content+" "}
              {m.sender._id === user._id?<i onClick={()=>deleteMessage(m._id,selectedChat)}  style={{color: "#ff0000"}} class="fa fa-trash fa-2xs"></i>:""}
            </Box>
          </Box>
        ))}
    </ScrollFeed>
  );
};

export default ScrollableChat;
