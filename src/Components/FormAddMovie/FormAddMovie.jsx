import React from 'react'
import { Form, Input, DatePicker, Switch, Upload, Button, Col, Row,Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';




const FormAddMovie = () => {
//Form
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


  //Formik
  const formik = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: "",
      sapChieu: "",
      hot: "",
      danhGia: "",
      hinhAnh: "",
    },
    onSubmit: async (values) => {
      console.log(values)
      // try {
      //   const res = await movieServ.addMovie(values);
      //   messageApi.success("Thêm Phim Thành Công");
      //   dispatch(getAllMovie());
      //   formik.resetForm();
      // } catch (error) {
      //   messageApi.error(error.response.data.content);
      //   formik.resetForm();
      // }
    },
  });

  return (
    <div>
     <Form layout="vertical" >
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
            name="danhGia"
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
      <Space>
        <Button className='bg-green-600 text-white rounded-lg mb-5 '>
            Thêm Phim
            </Button>
            </Space>
    </Form>
    </div>
  )
}

export default FormAddMovie