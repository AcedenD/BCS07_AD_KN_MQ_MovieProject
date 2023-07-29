import { Input, Space } from 'antd';
import React from 'react';

const { Search } = Input;

const AdminSearch = ({onSearch}) => (
    <Space direction="vertical" style={{ width: "100%", marginBottom: "10px"}}>
    <Search
      placeholder="Tìm Kiếm"
      onSearch={onSearch}
      enterButton
      style={{ width: "100%", }}
    />
  </Space>
        );
        export default AdminSearch;