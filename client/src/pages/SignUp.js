import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Button,
  Input,
  FormFeedback
} from "reactstrap";
import { useHistory } from "react-router-dom";

const SignUp = props => {
  const [usernameValid /*, setusernameValid*/] = useState(true);
  const [signupData, setSignupData] = useState({
    name:[""],
    username:[""],
    password:[""],
    email:[""]
  });
  const history = useHistory();

  let name = signupData.name[0];
  let username = signupData.username[0];
  let password = signupData.password[0];
  let email = signupData.email[0];

  const validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@0"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\.))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePasswordLength = password => {
      var re = /^[A-Za-z\d@$!%*?&]{6,}$/;
      return re.test(password);
  };

  const validatePasswordLowercaseLetter = password => {
    var re = /^(?=.*[a-z])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const validatePasswordUppercaseLetter = password => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const validatePasswordNumber = password => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const validatePasswordSpecialCharacter = password => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const handleInput = e => {
    setSignupData({
      ...signupData,
      [e.target.name]: [e.target.value]
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signUpUser(
      {
        name: name,
        username: username,
        password: password,
        email: email
      },
      success => {
        if (success) {
          alert("loggin success");
        }
      }
    );
  };

  return (
    <>
      <Container className="middle-screen dark body-pattern">
        <Row className="no-margin no-padding">
          <Col>
            <Card className="rounded-corner dark-form small-20px">
              <Row>
                <Col className="logo"></Col>
              </Row>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={name}
                      onChange={handleInput}
                      {...(name.length >= 6
                        ? usernameValid
                          ? { valid: true }
                          : { invalid: true }
                        : name.length > 0
                          ? { invalid: true }
                          : "")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={e => {
                        handleInput(e);
                      }}
                      {...(username.length >= 6
                        ? usernameValid
                          ? { valid: true }
                          : { invalid: true }
                        : username.length > 0
                          ? { invalid: true }
                          : "")}
                    />
                    <FormFeedback
                      {...(username.length > 0 && username.length >= 6
                        ? usernameValid
                          ? { valid: true }
                          : { invalid: true }
                        : { invalid: true })}
                    >
                      {username.length >= 6
                        ? usernameValid
                          ? "Sweet, this username is available!"
                          : "Sorry, this username is taken!"
                        : "Must be minimum 6 characters"}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={password}
                      onChange={handleInput}
                      {...(password.length === 0
                        ? ""
                        : validatePasswordLength(password)
                        ? validatePasswordLowercaseLetter(password)
                          ? validatePasswordUppercaseLetter(password)
                            ? validatePasswordNumber(password)
                              ? validatePasswordSpecialCharacter(password)
                                ? { valid: true }
                                : { invalid: true }
                              : { invalid: true }
                            : { invalid:true }
                          : { invalid: true }
                        : { invalid: true })}
                    />
                    <FormFeedback
                      {...(validatePasswordLength(password)
                          ? validatePasswordLowercaseLetter(password)
                            ? validatePasswordUppercaseLetter(password)
                              ? validatePasswordNumber(password)
                                ? validatePasswordSpecialCharacter(password)
                                  ? { valid: true }
                                  : { invalid: true }
                                : { invalid: true }
                              : { invalid:true }
                            : { invalid: true }
                          : { invalid: true })}
                    >
                      {validatePasswordLength(password)
                          ? validatePasswordLowercaseLetter(password)
                            ? validatePasswordUppercaseLetter(password)
                              ? validatePasswordNumber(password)
                                ? validatePasswordSpecialCharacter(password)
                                  ? ""
                                  : "Must be minimum 1 special character"
                                : "Must be minimum 1 number"
                              : "Must be minimum 1 uppercase letter"
                            : "Must be minimum 1 lowercase letter"
                          : "Must be minimum 6 characters"
                      }
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleInput}
                      {...(email.length === 0
                        ? ""
                        : validateEmail(email)
                          ? { valid: true }
                          : { invalid: true })}
                    />
                    <FormFeedback
                      {...(validateEmail(email)
                          ? { valid: true }
                          : { invalid: true })}
                    >
                      {validateEmail(email)
                          ? ""
                          : "Invalid email address"}
                    </FormFeedback>
                  </FormGroup>
                  <Button
                    disabled={
                      name && username && email && password ? false : true
                    }
                    className="dark-btn-full-width"
                    color="info"
                  >
                    Create account
                  </Button>
                </Form>
                <Button
                  onClick={() => history.push("/signin")}
                  color="link"
                  className="center"
                >
                  Have an account? Sign in here
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;


