import { useState } from 'react';
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
  Label,
} from 'reactstrap';
// core components

const { Option } = Select;

const AddUser = ({ openModal, handleModal, getUsers }) => {
  let [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verification: true,
    // address: '',
    number: '',
    confirmPassword: '',
    id_card: '',
  });

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
    if (user.firstName == '') {
      return toast.error('First Name is required');
    }
    if (user.lastName == '') {
      return toast.error('Last Name is required ');
    }

    if (user.email == '') {
      return toast.error('Please enter email');
    }
    if (!(user.email.includes('.') && user.email.includes('@'))) {
      return toast.error('Please enter a valid email');
    }
    if (user.number == '') {
      return toast.error('Contact no. is required');
    }
    if (user.password == '') {
      return toast.error('Password is required');
    }
    if (user.confirmPassword == '') {
      return toast.error('Confirm password is required');
    }
    if (user.password.length < 8) {
      return toast.error('Passwords should be of atleast 8 letters');
    }
    if (user.confirmPassword != user.password) {
      return toast.error('Confirm password does not match');
    }

    if (user.id_card == '') {
      return toast.error('ID Card no. is required');
    }

    api('post', '/admins/addStaff', {
      ...user,
      first_name: user.firstName,
      last_name: user.lastName,
    }).then((res) => {
      toast.success('User added successfully');
      getUsers();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Add a member
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {user.firstName ? '' : '*'}{' '}
                          </span>
                          First Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter First Name'
                          type='text'
                          value={user.firstName}
                          name='firstName'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {user.lastName ? '' : '*'}{' '}
                          </span>
                          Last Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Last Name'
                          type='text'
                          value={user.lastName}
                          name='lastName'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6'>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {user.email ? '' : '*'}{' '}
                          </span>
                          Email
                        </label>{' '}
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
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>
                            {user.number ? '' : '*'}{' '}
                          </span>{' '}
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
                  <Row>
                    <Col lg='6'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-password'
                        >
                          <span style={{ color: 'red' }}>
                            {user.password ? '' : '*'}{' '}
                          </span>
                          Password
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='input-password'
                          placeholder='Password'
                          type='password'
                          value={user.password}
                          name='password'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6'>
                      <FormGroup>
                        <label
                          className='form-control-label'
                          htmlFor='input-confirmPassword'
                        >
                          <span style={{ color: 'red' }}>
                            {user.confirmPassword ? '' : '*'}{' '}
                          </span>
                          Confirm Password
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='input-confirmPassword'
                          placeholder='Confirm Password'
                          type='password'
                          value={user.confirmPassword}
                          name='confirmPassword'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6'>
                      <FormGroup>
                        <label className='form-control-label' htmlFor='id_card'>
                          <span style={{ color: 'red' }}>
                            {user.id_card ? '' : '*'}{' '}
                          </span>
                          ID Card
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='id_card'
                          placeholder='ID card number'
                          type='text'
                          value={user.id_card}
                          name='id_card'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddUser;
