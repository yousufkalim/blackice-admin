/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
import {
  Badge,
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from 'reactstrap';

// core components
import AddReward from './AddReward';
import EditReward from './EditReward';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const Rewards = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { rewards } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [reward, setReward] = useState({
    _id: '',
    milestone: '',
    credits: '',
    description: '',
  });

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    const data = await api('get', '/rewards');
    updateStore({ rewards: data.rewards });
  };
  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setReward({
        _id: item._id,
        milestone: item.milestone,
        credits: item.credits,
        description: item.description,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  //   const handleDelete = (id) => {
  //     api('delete', `/staff/${id}`).then(() => {
  //       toast.success('User deleted successfully');
  //       getUsers();
  //     });
  //   };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>Rewards</h3>
                  <Button
                    color='primary'
                    href='#pablo'
                    onClick={handleModal}
                    size='md'
                  >
                    <i className='ni ni-fat-add'></i>
                    Add Reward
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Milestone</th>
                    <th scope='col'>Credits</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Created At</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {rewards?.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            {/* <Media> */}
                            <span
                              className='mb-0 text-sm'
                              title={item.milestone}
                            >
                              {item.milestone?.length > 30
                                ? item.milestone?.substring(0, 30) + '...'
                                : item.milestone}
                            </span>
                            {/* </Media> */}
                          </Media>
                        </th>
                        <th>
                          <span className='mb-0 text-sm' title={item.credits}>
                            {item.credits?.length > 30
                              ? item.credits?.substring(0, 30) + '...'
                              : item.credits}
                          </span>
                        </th>

                        <td title={item.description}>
                          {item.description?.length > 30
                            ? item.description?.substring(0, 30) + '...'
                            : item.description}
                        </td>

                        <td>{new Date(item.createdAt).toDateString()}</td>

                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              href='#pablo'
                              role='button'
                              size='sm'
                              color=''
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              {item.test_conducted && (
                                <DropdownItem
                                  onClick={() =>
                                    history.push(`/admin/users/${item._id}`)
                                  }
                                >
                                  View
                                </DropdownItem>
                              )}
                              <DropdownItem
                                href='#pablo'
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem>
                              {/* <DropdownItem
                                href='#pablo'
                                className='text-danger'
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem> */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddReward
            openModal={openModal}
            handleModal={handleModal}
            getRewards={getRewards}
          />
        )}
        {editModal && (
          <EditReward
            openModal={editModal}
            handleModal={handleEditModal}
            reward={reward}
            setReward={setReward}
            getRewards={getRewards}
          />
        )}
      </Container>
    </>
  );
};

export default Rewards;
