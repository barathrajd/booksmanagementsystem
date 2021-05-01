import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productionActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../types';
import Meta from '../components/Meta';

const ProductPage = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.productReview);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productReview;

  useEffect(() => {
    if (successCreate) {
      alert('Review Submited');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successCreate]);

  const addtoCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <>
          <Meta
            title={product.title}
            description={product.description}
            keywords={product.title}
          />
          <Row>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Image
                    src={product.image}
                    alt={product.title}
                    className='mx-4'
                    fluid
                  />
                </ListGroup.Item>
                <ListGroup.Item>IBSN: {product.isbn}</ListGroup.Item>
                <ListGroup.Item>Price: &#x20B9;{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} reviwes`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>{' '}
            <Col xs={{ order: 'first' }} md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Auhtor Name: {product.author}</ListGroup.Item>
                <ListGroup.Item>Published: {product.published}</ListGroup.Item>
                <ListGroup.Item>Publisher: {product.publisher}</ListGroup.Item>
                <ListGroup.Item>Pages: {product.pages}</ListGroup.Item>
                <ListGroup.Item>Subtitle: {product.subtitle}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>&#x20B9;{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{ padding: '0rem' }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (e) => (
                                <option key={e + 1} value={e + 1}>
                                  {e + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addtoCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Write a Customer Reviews</h2>
                {loadingCreate && (
                  <Message variant='success'>
                    Review Submitted successfully
                  </Message>
                )}
                {errorCreate && (
                  <Message variant='danger'>{errorCreate}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value='0'>Select</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Commet</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please,{''}
                    <Link to='/login'>Login</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
