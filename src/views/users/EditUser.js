import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import { Select } from 'antd';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
// core components

const { Option } = Select;

const EditUser = ({ openModal, handleModal, user, setUser, getUsers }) => {
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleNumberInput = (e) => {
    if (!e.target.value.match(/[^0-9]/)) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.first_name == '') {
      return toast.error("Please enter user's first name");
    }
    if (user.last_name == '') {
      return toast.error("Please enter user's last name");
    }

    if (user.email == '') {
      return toast.error('Please enter email');
    }
    if (!(user.email.includes('.') && user.email.includes('@'))) {
      return toast.error('Please enter a valid email');
    }

    // if (user.password && user.password.length < 8) {
    //   return toast.error('Passwords should be of atleast 8 letters');
    // }

    if (user.number == '') {
      return toast.error('Contact no. is required');
    }

    api('put', `/staff/${user._id}`, user).then((res) => {
      toast.success('user edited successfully');
      getUsers();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Edit a user
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {user.first_name ? '' : '*'}{' '}
                        </span>
                        <label className='form-control-label'>First Name</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's name here"
                          type='text'
                          value={user.first_name}
                          name='first_name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {user.last_name ? '' : '*'}{' '}
                        </span>
                        <label className='form-control-label'>Last Name</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's name here"
                          type='text'
                          value={user.last_name}
                          name='last_name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {user.email ? '' : '*'}{' '}
                        </span>
                        <label className='form-control-label'>Email</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's email here"
                          type='email'
                          value={user.email}
                          name='email'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6'>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {user.number ? '' : '*'}{' '}
                        </span>
                        <label className='form-control-label'>
                          Contact no.
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's contact here"
                          type='phone'
                          value={user.number}
                          name='number'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Address</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's address here"
                          type="text"
                          value={user.address}
                          name="address"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">City</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's city here"
                          type="text"
                          value={user.city}
                          name="city"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Country</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's country here"
                          type="text"
                          value={user.country}
                          name="country"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditUser;
