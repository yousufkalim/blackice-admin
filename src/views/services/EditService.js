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

const EditService = ({
  openModal,
  handleModal,
  service,
  setService,
  getServices,
}) => {
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
    } else if (service.price == 0) {
      return toast.error('Price cannot be zero');
    }
    if (service.time == '') {
      return toast.error('Please enter a time');
    } else if (service.time == 0) {
      return toast.error('Time cannot be zero');
    }

    api('put', `/services/${service._id}`, service).then((res) => {
      toast.success('Service edited successfully');
      getServices();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Edit Service
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

export default EditService;
