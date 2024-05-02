import React, { useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function SlideBarFilter({ slideBarFilter }) {
  //-----Check status-----//
  const handleCategoryClick = (event) => {
    const checkbox = event.currentTarget.querySelector('.ck-category');
    //-----Reverse checkbox-----//
    checkbox.checked = !checkbox.checked;
  };
  return (
    <div className='home-filter'>
      <div className="slide-filter">
        <div className="slide-filter-header">
          <h6>Filters</h6>
          <div className="close-filter" onClick={slideBarFilter}>
            <IoMdClose fontSize={17} color='grey' />
          </div>
        </div>
        <div className="slide-filter-category">
          <h6>Categories</h6>
          <div className="filter-category-item">
            <ul>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Tâm lý</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Chính kịch</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Kinh dị</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Phiêu lưu</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Tình cảm</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Hài</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Nhạc kịch</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Hành động</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Hoạt hình</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Hồi hộp</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Phim tài liệu</span>
                </div>
              </li>
              <li className='li-category' onClick={handleCategoryClick}>
                <div className="check-category">
                  <input type="checkbox" name="" className='ck-category' />
                </div>
                <div className="list-category">
                  <span>Sử thi - lồng tiếng</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="btn-filter">
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

