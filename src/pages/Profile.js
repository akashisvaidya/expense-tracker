import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import DashboardLayout from "../components/layout/DashboardLayout";
import { updatePassword } from "../helpers/axiosHelper";

const initialState = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};
export const Profile = () => {
  const [user, setUser] = useState({});
  const [updatePassForm, setUpdatePassForm] = useState(initialState);
  const [showPassForm, setShowPassForm] = useState(false);
  const handleOnPassChange = (e) => {
    const { name, value } = e.target;
    setUpdatePassForm({
      ...updatePassForm,
      [name]: value,
    });
  };

  const submitUpdatePass = async (e) => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = updatePassForm;

    if (confirmPassword !== password) {
      return toast.error("Password does not match!");
    }
    const { status, message } = await updatePassword({
      currentPassword,
      password,
    });
    toast[status](message);
    setUpdatePassForm(initialState);
  };
  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u);
  }, []);
  return (
    <DashboardLayout>
      <Modal
        show={showPassForm}
        onHide={() => {
          setShowPassForm(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <Form onSubmit={submitUpdatePass}>
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  placeholder="Enter Your Current Password"
                  onChange={handleOnPassChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Your New Password"
                  onChange={handleOnPassChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Your New Password"
                  onChange={handleOnPassChange}
                ></Form.Control>
              </Form.Group>
              <Button variant="success" type="submit" className="mt-2">
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      <Container>
        <Row className="p-5">
          <Col md={8}>
            <div className="profile-left">
              <ul>
                <li>
                  <strong>Profile ID:</strong> {user?._id}
                </li>
                <li>
                  <strong>Name:</strong> {`${user?.fName} ${user?.lName}`}
                </li>
                <li>
                  <strong>Email:</strong> {user?.email}
                </li>
                <li>
                  <strong>Status:</strong>
                  <span
                    className={
                      user?.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {" "}
                    {user?.status}
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column gap-4">
            <Button variant="warning">Update User Name</Button>
            <Button
              variant="dark"
              onClick={() => {
                setShowPassForm(true);
              }}
            >
              Update Password
            </Button>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};
