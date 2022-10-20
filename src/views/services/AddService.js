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
    price: { s: '', m: '', l: '', xl: '' },
    time: '',
  });

  const handleInput = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };
  const handleNumberInput = (e) => {
    if (!e.target.value.match(/[^0-9]/)) {
      setService({
        ...service,
        [e.target.name]: e.target.value,
        price: {
          ...service.price,
          [e.target.name]: e.target.value,
        },
      });
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
    if (
      service.price.s == '' ||
      service.price.m == '' ||
      service.price.l == '' ||
      service.price.xl == ''
    ) {
      return toast.error('Please enter price for each');
    } else if (
      service.price.s == 0 ||
      service.price.m == 0 ||
      service.price.l == 0 ||
      service.price.xl == 0
    ) {
      return toast.error('Price cannot be zero');
    }
    if (service.time == '') {
      return toast.error('Please enter a time');
    } else if (service.time == 0) {
      return toast.error('Time cannot be zero');
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
                    <Col lg='3'>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {service.price.s ? '' : '*'}{' '}
                          </span>
                          Price (S)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Small'
                          type='text'
                          value={service.price.s}
                          name='s'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='3'>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {service.price.m ? '' : '*'}{' '}
                          </span>
                          Price (M)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Medium'
                          type='text'
                          value={service.price.m}
                          name='m'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='3'>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {service.price.l ? '' : '*'}{' '}
                          </span>
                          Price (L)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Large'
                          type='text'
                          value={service.price.l}
                          name='l'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='3'>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {service.price.xl ? '' : '*'}{' '}
                          </span>
                          Price (XL)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='X-Large'
                          type='text'
                          value={service.price.xl}
                          name='xl'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
