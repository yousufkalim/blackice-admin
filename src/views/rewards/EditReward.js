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

const EditReward = ({
  openModal,
  handleModal,
  reward,
  setReward,
  getRewards,
}) => {
  const handleInput = (e) => {
    setReward({ ...reward, [e.target.name]: e.target.value });
  };
  const handleNumberInput = (e) => {
    if (!e.target.value.match(/[^0-9]/)) {
      setReward({ ...reward, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reward.milestone === '') {
      return toast.error('Milestone is required');
    }
    if (reward.credits === '') {
      return toast.error('Credit is required ');
    }

    if (reward.description == '') {
      return toast.error('Description is required');
    }

    api('put', `/rewards/${reward._id}`, reward).then((res) => {
      toast.success('Reward edited successfully');
      getRewards();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Edit a reward
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
                          {reward.milestone === '' ? '*' : ''}{' '}
                        </span>
                        <label className='form-control-label'>Milestone</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Milestone'
                          type='text'
                          value={reward.milestone}
                          name='milestone'
                          onChange={handleNumberInput}
                          maxLength={11}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {reward.credits === '' ? '*' : ''}{' '}
                        </span>
                        <label className='form-control-label'>Credits</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Credits'
                          type='text'
                          value={reward.credits}
                          name='credits'
                          onChange={handleNumberInput}
                          maxLength={11}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6'>
                      <FormGroup>
                        <span style={{ color: 'red' }}>
                          {reward.description ? '' : '*'}{' '}
                        </span>
                        <label className='form-control-label'>
                          Description
                        </label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter Description'
                          type='text'
                          value={reward.description}
                          name='description'
                          onChange={handleInput}
                          maxLength={100}
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditReward;
