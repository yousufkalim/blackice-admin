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

const AddService = ({ openModal, handleModal, getServices }) => {
  let [service, setService] = useState({
    name: '',
    description: '',
    price: '',
    time: '',
  });

  const handleInput = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };
  const handleNumberInput = (e) => {
    if (!e.target.value.match(/[^0-9]/)) {
      setService({ ...service, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (service.name == '') {
      return toast.error('Name is required');
    }
    if (service.description == '') {
      return toast.error('Description is required ');
    }
    if (service.price == '') {
      return toast.error('Please enter price');
    }
    if (service.time == '') {
      return toast.error('Please enter a time');
    }

    api('post', '/services', {
      ...service,
    }).then((res) => {
      toast.success('User added successfully');
      getServices();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Add a Service
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
                            {service.name ? '' : '*'}{' '}
                          </span>
                          Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Name'
                          type='text'
                          value={service.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {service.description ? '' : '*'}{' '}
                          </span>
                          Description
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Description'
                          type='text'
                          value={service.description}
                          name='description'
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
                            {service.price ? '' : '*'}{' '}
                          </span>
                          Price
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter price'
                          type='text'
                          value={service.price}
                          name='price'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6'>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>
                            {service.time ? '' : '*'}{' '}
                          </span>{' '}
                          Time
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter time required in minutes'
                          type='text'
                          value={service.time}
                          name='time'
                          onChange={handleNumberInput}
                          maxLength='11'
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

export default AddService;
