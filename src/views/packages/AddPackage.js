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
    price: { s: '', m: '', l: '', xl: '' },
    time: '',
  });
  const { allServices } = Store();
  const [addServices, setAddServices] = useState([]);

  const handleInput = (e) => {
    setPackages({ ...packages, [e.target.name]: e.target.value });
  };
  const handleNumberInput = (e) => {
    if (!e.target.value.match(/[^0-9]/)) {
      setPackages({
        ...packages,
        [e.target.name]: e.target.value,
        price: {
          ...packages.price,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  //Summation of price & time
  useEffect(() => {
    if (addServices.length !== 0) {
      setPackages((r) => ({
        ...r,
        time: addServices?.time?.reduce((a, b) => a + b, 0),
        price: {
          ...r.price,
          s: addServices?.smallPrice?.reduce((a, b) => a + b, 0),
          m: addServices?.mediumPrice?.reduce((a, b) => a + b, 0),
          l: addServices?.largePrice?.reduce((a, b) => a + b, 0),
          xl: addServices?.xlargePrice?.reduce((a, b) => a + b, 0),
        },
      }));
    }
  }, [addServices]);

  const handleSelectChange = (e) => {
    setAddServices((s) => ({
      ...s,
      value: e.map((service) => service.value),
      smallPrice: e.map((service) => service.smallPrice),
      mediumPrice: e.map((service) => service.mediumPrice),
      largePrice: e.map((service) => service.largePrice),
      xlargePrice: e.map((service) => service.xlargePrice),
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
    if (
      packages.price.s == '' ||
      packages.price.m == '' ||
      packages.price.l == '' ||
      packages.price.xl == ''
    ) {
      return toast.error('Please enter price for each');
    } else if (
      packages.price.s == 0 ||
      packages.price.m == 0 ||
      packages.price.l == 0 ||
      packages.price.xl == 0
    ) {
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
      <Modal isOpen={openModal} size='xl' centered>
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
                    <Col lg='3'>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>
                            {packages.price.s ? '' : '*'}{' '}
                          </span>
                          Price (S)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Small'
                          type='text'
                          value={packages.price.s}
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
                            {packages.price.m ? '' : '*'}{' '}
                          </span>
                          Price (M)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Medium'
                          type='text'
                          value={packages.price.m}
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
                            {packages.price.l ? '' : '*'}{' '}
                          </span>
                          Price (L)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Large'
                          type='text'
                          value={packages.price.l}
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
                            {packages.price.xl ? '' : '*'}{' '}
                          </span>
                          Price (XL)
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='X-Large'
                          type='text'
                          value={packages.price.xl}
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
                    <Col lg='6'>
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
                              smallPrice: item.price.s,
                              mediumPrice: item.price.m,
                              largePrice: item.price.l,
                              xlargePrice: item.price.xl,
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
