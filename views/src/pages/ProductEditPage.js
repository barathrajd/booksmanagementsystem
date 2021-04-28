import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productionActions';
import { updateProduct } from '../actions/adminActions';
import { PRODUCT_UPDATE_RESET } from '../types';

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.title || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setIsbn(product.isbn);
        setTitle(product.title);
        setSubtitle(product.subtitle);
        setAuthor(product.author);
        setImage(product.image);
        setPublished(product.published);
        setPublisher(product.publisher);
        setPages(product.pages);
        setDescription(product.description);
        setPrice(product.price);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        title,
        isbn,
        subtitle,
        author,
        image,
        published,
        publisher,
        countInStock,
        price,
        pages,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        {' '}
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isbn'>
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ISBN Number'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='subtitle'>
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Subtitle'
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='author'>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Author Name'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='published'>
              <Form.Label>Published</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter published'
                value={published}
                onChange={(e) => setPublished(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='publisher'>
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Publisher'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='pages'>
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Pages'
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countinstock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countinstock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
