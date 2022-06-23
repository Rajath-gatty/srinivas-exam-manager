import React from 'react';
import { useState } from "react";
import Carousel from 'better-react-carousel';
import Calendar from 'react-calendar';
import "./Dashboard.css";
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className='box'>
      <div className='heading'>
        <h1 className='title'><center>SRINIVAS COLLEGE OF COMPUTER SCIENCE AND INFORMATION SCIENCE</center></h1>
        <img className='logo-img' src='https://upload.wikimedia.org/wikipedia/en/e/e1/Srinivas_University_logo.gif' alt='logo' />
      </div>
      <Carousel cols={1} rows={1} gap={10} autoplay={1000} loop={true} breakpoint={800} hideArrow={true}>
        <Carousel.Item>
          <img className='college' width="100%" height="60%" src="https://www.srinivasgroup.com/img/home/banner2.jpg" alt='srinivas' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='college' width="100%" height="60%" src="https://www.srinivasgroup.com/img/home/banner2.jpg" alt='srinivas' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='college' width="100%" height="60%" src="https://www.srinivasgroup.com/img/home/banner2.jpg" alt='srinivas' />
        </Carousel.Item>

      </Carousel>
      <div className='calender-main'>
        <h2 className='text'><center>COLLEGE CALENDAR</center></h2>
        <div className='calender'>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
      <div className='college-header'>
        <h2 className='header-text'><center>SRINIVAS UNIVERSITY</center></h2>
        <div className='college-text'>
          <p> Srinivas University, Mangalore, is a Private Research and skill focused University in Mangalore, Karnataka, India established in 2013 by Karnataka State Act.Srinivas University is the flagship of 18 Srinivas Group of Institutions started by A. Shama Rao Foundation, Mangalore, India, a private Charitable Trust founded in 1988 by an Eminent Chartered Accountant A. Raghavendra Rao. A. Shama Rao Foundation has started many professional colleges in Mangalore which include Srinivas Institute of Medical Sciences and Research Center, Srinivas Institute of Dental Sciences, Srinivas Institute of Technology, Srinivas College of Pharmacy, Srinivas Institute of Nursing Sciences, A Shama Rao Nursing School, Srinivas Integrated Campus, Srinivas College of Hotel Management, Vijayalakshmi Institute of Hospitality Sciences, Srinivas First Grade College, Srinivas School of Engineering, Srinivas Institute of Management Studies, Srinivas College of Physiotherapy, Srinivas School of Business, Srinivas School of Management, Srinivas College of Education, Srinivas Institute of Social Work.</p>
        </div>

        <div className='description'>
          <img className=" photo" src='https://srinivasuniversity.edu.in/asset/img/chancellor.png'></img>
          <span> <p className='head-title'>Shri Dr. CA A. Raghavendra Rao</p>
            <p className='highlight-title'> Chancellor of Srinivas University</p>

            <p className='head-title'> My aim is to transform Society through education by setting up academic institutions in dynamic equilibrium with its social, ecological and economic environment striving continuously for excellence in education, research and technological service to the nation.</p></span>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;