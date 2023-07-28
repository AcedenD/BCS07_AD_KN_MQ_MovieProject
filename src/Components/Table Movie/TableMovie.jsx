import React, { useRef } from 'react'
import { Space, Table, Tag } from 'antd';
import {  useDispatch, useSelector } from 'react-redux';
import { movieServ } from '../../services/movieServices';
import { getAllMovie } from '../../redux/slices/movieSlice';


//Mã Phim, Hình Ảnh, Tên Phim, Mô Tả, Hành Động
const TableMovie = () => {
    const {phimData} = useSelector((state) => state.movies);
    console.log(phimData);
    const dispatch = useDispatch();
    const ref = useRef();

    const shortenText = (text, maxLength) => {
        if (text.split(' ').length > maxLength) {
          const words = text.split(' ');
          return words.slice(0, maxLength).join(' ') + '...';
        }
        return text;
      };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            key: 'maPhim',
            
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text) => <img src={text} alt="Hình Ảnh" style={{ width: 100 }} />,
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            width: 150,
      className: 'text-wrap',
        },
        {
            title: 'Mô Tả',
            key: 'moTa',
            dataIndex: 'moTa',
            width: 350,
      className: 'text-wrap',
      render: (text) => (
        <span title={text}>{shortenText(text, 45)}</span>
      ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className='py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 suration-500'
                     onClick={() => {
                        movieServ  
                          .deleteMovie(record.maPhim)
                          .then((res) => {
                            alert("delete successful");
                            dispatch(getAllMovie());
                          })
                          .catch((err) => {
                            console.log(err);
                            alert("There is a problem deleting");
                          });
                      }}>Xóa</button>

                    <button className='py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 suration-500'>Sửa</button>

                </Space>
            ),
        },
    ];

    let newMovie = phimData.map((item, index) => {
        return {
          ...item,
          id: index + 1,
        };
      });

    return (
        <Table columns={columns} dataSource={newMovie.length > 0 && newMovie} />
    )
}

export default TableMovie