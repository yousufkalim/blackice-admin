import { useEffect, useState } from 'react';
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
} from 'reactstrap';
// core components

const EditPackage = ({
  openModal,
  handleModal,
  packages,
  setPackages,
  getPackages,
}) => {
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
    setPackages((s) => ({
      ...s,
      services: e.map((service) => service.value),
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
    api('put', `/packages/${packages._id}`, packages).then((res) => {
      toast.success('Package edited successfully');
      getPackages();
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
                    <Col lg='6'>
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
                            {addServices?.value?.length != 0 ? '' : '*'}{' '}
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
                          defaultValue={packages.services.map((item) => {
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

export default EditPackage;
