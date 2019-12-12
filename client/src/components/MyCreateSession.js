import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Label, Form, FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
// import LiveSession from '../pages/LiveSession';

const MyCreateSession = props => {
  const jwt = localStorage.getItem("userToken");
  const createSessionApi = process.env.REACT_APP_CREATE_SESSION_API;

  const [sessionData, setSessionData] = useState({
    title: [],
    session_type: [],
    description: []
  });
  const [responseId, setResponseId] = useState(-1);
  let history = useHistory();

  let formData = {
    title: sessionData.title[0],
    session_type: 'Lecture',
    // session_type: sessionData.session_type[0],
    description: sessionData.description[0]
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(createSessionApi, formData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(response => {
        setResponseId(response.data.session.id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (responseId > 0) {
      history.push({
        pathname: "/livesession",
        state: { session_id: responseId, darkMode: true }
      });
    }
  });

  const handleInput = e => {
    setSessionData({
      ...sessionData,
      [e.target.name]: [e.target.value]
    })
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Include a title."
            value={sessionData.title}
            onChange={handleInput}
          />
        </FormGroup>
        <FormGroup>
          <Label for="session_type">Session Type:</Label>
          <Input
            type="select"
            multiple={false}
            name="session_type"
            id="session_type"
            value={sessionData.session_type}
            onChange={handleInput}
          >
            <option>Lecture</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Include a description."
            value={sessionData.description}
            onChange={handleInput}
          />
        </FormGroup>
        <Button color='info' className='dark-btn-full-width rounded-corner'
          disabled={
            formData.title && formData.session_type && formData.description
              ? false
              : true
          }
        >
          Create
        </Button>
      </Form>
    </>
  );
};

export default MyCreateSession;
