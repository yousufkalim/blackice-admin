import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import Select from 'react-select';
import { Store, UpdateStore } from 'StoreContext';

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
import Item from 'antd/lib/list/Item';

// core components

const AddPackage = ({ openModal, handleModal, getPackages }) => {
  let [packages, setPackages] = useState({
    name: '',
    description: '',
    price: '',
    time: '',
  });
  const { allServices } = Store();
  const [addServices, setAddServices] = useState([]);
  const handleInput = (e) => {
    setPackages({ ...packages, [e.target.name]: e.target.value });
  };
  const handleNumberInput = (e) => {
    if (!e.target.value.match(/[^0-9]/)) {
      setPackages({ ...packages, [e.target.name]: e.target.value });
    }
  };

  //Summation of price & time
  useEffect(() => {
    if (addServices.length !== 0) {
      setPackages((s) => ({
        ...s,
        price: addServices?.price?.reduce((a, b) => a + b, 0),
        time: addServices?.time?.reduce((a, b) => a + b, 0),
      }));
    }
  }, [addServices]);

  const handleSelectChange = (e) => {
    setAddServices((s) => ({
      ...s,
      value: e.map((service) => service.value),
      price: e.map((service) => service.price),
      time: e.map((service) => service.time),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (packages.name == '') {
      return toast.error('Name is required');
    }
    if (packages.description == '') {
      return toast.error('Description is required ');
    }
    if (packages.price == '') {
      return toast.error('Please enter price');
    } else if (packages.price == 0) {
      return toast.error('Price cannot be zero');
    }
    if (packages.time == '') {
      return toast.error('Please enter a time');
    } else if (packages.time == 0) {
      return toast.error('Time cannot be zero');
    }

    api('post', '/packages', {
      services: addServices.value,
      ...packages,
    }).then((res) => {
      toast.success('User added successfully');
      getPackages();
      handleModal();
    });
  };
  return (
    <>
      <Modal isOpen={openModal} sie='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Add a package
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
                            {packages.name ? '' : '*'}{' '}
                          </span>
                          Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Name'
                          type='text'
                          value={packages.name}
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
                            {packages.description ? '' : '*'}{' '}
                          </span>
                          Description
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Description'
                          type='text'
                          value={packages.description}
                          name='description'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {packages.price ? '' : '*'}{' '}
                          </span>
                          Price
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter price'
                          type='text'
                          value={packages.price}
                          name='price'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>
                            {packages.time ? '' : '*'}{' '}
                          </span>{' '}
                          Time
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter time required in minutes'
                          type='text'
                          value={packages.time}
                          name='time'
                          onChange={handleNumberInput}
                          maxLength='11'
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12'>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>
                            {addServices?.value?.length ? '' : '*'}{' '}
                          </span>{' '}
                          Services
                        </label>

                        <Select
                          options={allServices.map((item) => {
                            return {
                              label: item.name,
                              value: item._id,
                              price: item.price,
                              time: item.time,
                            };
                          })}
                          isMulti={true}
                          placeholder='Please select'
                          onChange={handleSelectChange}
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

export default AddPackage;
