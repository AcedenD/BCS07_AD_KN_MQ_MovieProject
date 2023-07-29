import React, { useEffect, useState } from 'react';
import { rapServ } from './../../services/rapServices';

const FormAddLich = () => {
  const [heThongRap, setHeThongRap] = useState([]);
  const [selectedHeThongRap, setSelectedHeThongRap] = useState('');
  const [cumRap, setCumRap] = useState([]);

  useEffect(() => {
    rapServ
      .getAllHeThongRap()
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedHeThongRap) {
      rapServ
        .getAllCumRap(selectedHeThongRap)
        .then((res) => {
          console.log(res);
          setCumRap(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedHeThongRap]);

  const handleHeThongRapChange = (event) => {
    setSelectedHeThongRap(event.target.options[event.target.selectedIndex].id);
  };

  const renderHeThong = () => {
    return heThongRap.map((item) => (
      <option key={item.maHeThongRap} value={item.tenHeThongRap} id={item.maHeThongRap}>
        {item.tenHeThongRap}
      </option>
    ));
  };

  const renderCumRap = () => {
    return cumRap.map((item, index) => (
      <option key={index} value={item.tenCumRap}>
        {item.tenCumRap}
      </option>
    ));
  };

  return (

    
    <form>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="w-full"> 
      <label htmlFor="heThongRap" className="me-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Hệ Thống Rạp
      </label>
      <select onChange={handleHeThongRapChange}>
        {renderHeThong()}
      </select>
      </div>

      <div className="w-full">
      <label htmlFor="cumRap" className="me-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Cụm Rạp
      </label>
      <select>
        {renderCumRap()}
      </select>
      </div>

      <div className="w-full">
      <label htmlFor="ngayChieuGioChieu"  className="me-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Ngày Chiếu, Giờ Chiếu
      </label>
      <input type="datetime-local" id="ngayChieuGioChieu"  />
</div>

<div className="w-full">
      <label htmlFor="giaVe" className="me-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Giá Vé
      </label>
      <input
      placeholder='Nhập giá vé'
        type="number"
        id="giaVe"
        min="0"
        step="0.01"
      />
      </div>
      </div>
    </form>


   
    
  );
};

export default FormAddLich;
