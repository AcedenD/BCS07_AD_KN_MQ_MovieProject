import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Button } from "antd";
import { movieServ } from "../../services/movieServices";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    // Fetch movies when the component mounts
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await movieServ.getAllMovie();
      // Ensure that the response data is an array
      if (Array.isArray(response.data)) {
        setMovies(response.data);
        setSearchedMovies(response.data);
      } else {
        // If the response data is not an array, handle the error accordingly
        console.error("Invalid movie data format:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);

    // Filter movies based on the search text
    const filteredMovies = movies.filter((movie) =>
      movie.maNhom.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedMovies(filteredMovies);
  };

  const handleAddNewMovie = () => {
    // Handle logic to open the form for adding a new movie here
    console.log("Add new movie clicked");
  };

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maNhom",
      key: "maNhom",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-500"
            // Handle delete movie logic here
          >
            Xoá
          </button>
          <button
            className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500"
            // Handle edit movie logic here
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center mb-4">
        <Input
          placeholder="Search by Mã Phim"
          value={searchText}
          onChange={handleSearch}
          className="mr-2"
        />
        <Button type="primary" onClick={handleAddNewMovie}>
          Thêm Mới
        </Button>
      </div>
      <Table columns={columns} dataSource={searchedMovies} />
    </div>
  );
};

export default MovieManagement;
