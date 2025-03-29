import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, InputNumber, Select, Button, Spin, message } from 'antd';

const { Option } = Select;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const isEditMode = !!id;

  useEffect(() => {
    fetchSuppliers();
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      message.error('Failed to fetch suppliers');
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
      const product = response.data;
      
      // Set form values
      form.setFieldsValue({
        product_code: product.product_code,
        product_name: product.product_name,
        description: product.description || '',
        category: product.category || '',
        price: parseFloat(product.price),
        cost: product.cost ? parseFloat(product.cost) : null,
        stock_quantity: product.stock_quantity,
        reorder_level: product.reorder_level || null,
        supplier_id: product.supplier_id || null,
      });
      
      setInitialValues(product);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      message.error('Failed to fetch product details');
      setLoading(false);
      navigate('/products');
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      if (isEditMode) {
        // Update existing product
        await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${id}`, values);
        message.success('Product updated successfully');
      } else {
        // Create new product
        await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, values);
        message.success('Product created successfully');
      }
      
      setLoading(false);
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error('Failed to save product');
      }
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate('/products');
  };

  if (loading && isEditMode && Object.keys(initialValues).length === 0) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="product-form">
      <div className="page-header">
        <h1>{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          stock_quantity: 0,
        }}
      >
        <Form.Item
          name="product_code"
          label="Product Code"
          rules={[{ required: true, message: 'Please enter product code' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name="cost" label="Cost">
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name="stock_quantity" label="Stock Quantity">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="reorder_level" label="Reorder Level">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="supplier_id" label="Supplier">
          <Select allowClear placeholder="Select a supplier">
            {suppliers.map((supplier) => (
              <Option key={supplier.supplier_id} value={supplier.supplier_id}>
                {supplier.company_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;