import React, { useState } from 'react';
import * as yup from "yup";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space,  Switch, Upload } from 'antd';
import { InboxOutlined } from "@ant-design/icons";

const validationSchema = yup.object().shape({
    maPhim: yup.number().positive().integer().min(10000).max(99999).required(),
    soSao: yup.number().integer().min(1).max(10).required(),
  });

const { Option } = Select;
const FormAddMovie = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // const formik = useFormik({
  //   initialValues: {
  //     maPhim: "",
  //     tenPhim: "",
  //     moTa: "",
  //     ngayKhoiChieu: "",
  //     dangChieu: "",
  //     sapChieu: "",
  //     hot: "",
  //     danhGia: "",
  //     hinhAnh: "",
  //   },
  //   onSubmit: async (values) => {
  //     try {
  //       const res = await movieServ.addMovie(values);
  //       messageApi.success("them phim thanh cong");
  //       dispatch(getAllMovie());
  //       formik.resetForm();
  //     } catch (error) {
  //       messageApi.error(error.response.data.content);
  //       formik.resetForm();
  //     }
  //   },

  //   // add validation using yup from yup library
  //   validationSchema: addUserSchema,
  // });
  return (
    <>
    <div>
      <Button className='bg-green-600 text-white rounded-lg mb-5 'onClick={showDrawer} >
      <i class="fa-solid fa-plus"></i>  Thêm Phim
      </Button>
      </div>
      <Drawer
        title="Create a new monvie"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
          <Form layout="vertical" hideRequiredMark onFinish={onFinish} validationSchema={validationSchema}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="maPhim"
            label="Mã Phim"
            rules={[
              {
                required: true,
                message: "Xin Nhập Mã Phim",
              },
            ]}
          >
            <Input placeholder="Xin Nhập Mã Phim" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tenPhim"
            label="Tên Phim"
            rules={[
              {
                required: true,
                message: "Xin Nhập Tên Phim",
              },
            ]}
          >
            <Input placeholder="Xin Nhập Tên Phim" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="moTa"
            label="Mô Tả"
            rules={[
              {
                required: true,
                message: "Xin Nhập Mô Tả",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Xin Nhập Mô Tả" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ngayKhoiChieu"
            label="Ngày Khởi Chiếu"
            rules={[
              {
                required: true,
                message: "Please choose Ngày Khởi Chiếu",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="dangChieu" label="Đang Chiếu" valuePropName="checked">
            <Switch
              checkedChildren={<span style={{ color: "#ffffff" }}>On</span>}
              unCheckedChildren={<span style={{ color: "#ffffff" }}>Off</span>}
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#1890ff",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="sapChieu" label="Sắp Chiếu" valuePropName="checked">
            <Switch
              checkedChildren={<span style={{ color: "#ffffff" }}>On</span>}
              unCheckedChildren={<span style={{ color: "#ffffff" }}>Off</span>}
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#1890ff",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="hot" label="Hot" valuePropName="checked">
            <Switch
              checkedChildren={<span style={{ color: "#ffffff" }}>On</span>}
              unCheckedChildren={<span style={{ color: "#ffffff" }}>Off</span>}
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#1890ff",
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="soSao"
            label="Số Sao"
            rules={[
              {
                required: true,
                message: "Xin Nhập Số Sao",
              },
            ]}
          >
            <Input type="number" placeholder="Xin Nhập Số Sao" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="hinhAnh"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please upload Hình ảnh",
              },
            ]}
          >
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
        <Space>
        <Button onClick={onClose} Button className='bg-green-600 text-white rounded-lg mb-5 '>
            Thêm Phim
            </Button>
            </Space>
      </Drawer>
    </>
  );
};
export default FormAddMovie;