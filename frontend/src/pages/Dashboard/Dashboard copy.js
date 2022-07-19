import React from 'react';
import { useState } from "react";
import Carousel from 'better-react-carousel';
import Calendar from 'react-calendar';
import "./Dashboard.css";
import 'react-calendar/dist/Calendar.css';
import SimsLogo from "../../Assets/Srinivas_University_logo.webp";
import {BsGithub} from 'react-icons/bs';

const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className='dashboard-container'>
      <div className='dashboard-heading flex'>
        <img src="data:image/jpeg;base64,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" alt="SimsLogo" />
        <h1 className='title'><center>SRINIVAS COLLEGE OF COMPUTER SCIENCE AND INFORMATION SCIENCE</center></h1>
      </div>

      <Carousel className='Carousel' cols={1} rows={1} gap={10} autoplay={3000} loop={true} breakpoint={800} hideArrow={true}>
        <Carousel.Item>
          <img className='college' width="100%" height="40%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQECLmzO8M4i6wuoSjdmfwLGDEOQNJAvXOcpA&usqp=CAU" alt='srinivas-muk' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='college' width="100%" height="40%" src="https://www.srinivasgroup.com/img/home/banner2.jpg" alt='srinivas' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='college' width="100%" height="40%" src="https://static.collegedekho.com/media/img/institute/crawled_images/None/1592131056Cover.jpg" alt='srinivas-pand' />
        </Carousel.Item>
      </Carousel>

      <div className='college-header flex'>
        <div className="college-data">
          <h2 className='header-text'><center>SRINIVAS UNIVERSITY</center></h2>
          <div className='college-text'>
            <p> Srinivas University, Mangalore, is a Private Research and skill focused University in Mangalore, Karnataka, India established in 2013 by Karnataka State Act.Srinivas University is the flagship of 18 Srinivas Group of Institutions started by A. Shama Rao Foundation, Mangalore, India, a private Charitable Trust founded in 1988 by an Eminent Chartered Accountant A. Raghavendra Rao. A. Shama Rao Foundation has started many professional colleges in Mangalore which include Srinivas Institute of Medical Sciences and Research Center, Srinivas Institute of Dental Sciences, Srinivas Institute of Technology, Srinivas College of Pharmacy, Srinivas Institute of Nursing Sciences, A Shama Rao Nursing School, Srinivas Integrated Campus, Srinivas College of Hotel Management, Vijayalakshmi Institute of Hospitality Sciences, Srinivas First Grade College, Srinivas School of Engineering, Srinivas Institute of Management Studies, Srinivas College of Physiotherapy, Srinivas School of Business, Srinivas School of Management, Srinivas College of Education, Srinivas Institute of Social Work.</p>
          </div>
        </div>

        <div className='calender-main'>
          <h2 className='text'><center>COLLEGE CALENDAR</center></h2>
          <div className='calender'>
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>

      <div className='description flex'>
        <img className="photo" src='https://srinivasuniversity.edu.in/asset/img/chancellor.png'></img>
        <div className="personInfo">
          <span className='Name'>Shri Dr.CA. Raghavendra Rao</span><br />
          <span className='post'>Chancellor of Srinivas University</span>
          <p>"My aim is to transform Society through education by setting up academic institutions in dynamic equilibrium with its social, ecological and economic environment striving continuously for excellence in education, research and technological service to the nation."</p>
        </div>
      </div>

      <div className="footer flex">
        <div className="footer-left">
          <span className='college-title'>Srinivas University</span>
          <p><span>Address : </span>VR3R+78H, SRINIVAS UNIVERSITY CITY CAMPUS, Pandeshwar, Mangaluru, Karnataka 575001</p>
          <p><span>Phone : </span>0824 244 1022</p>
        </div>

        <div className="footer-right">
          <span className="Devs">Developed By :</span>
          <a href='https://github.com/ChiragChrg' target="_blank" rel="noopener noreferrer" className='DevName'> <BsGithub/> Chirag</a>
          <a href='https://github.com/Rajath-gatty' target="_blank" rel="noopener noreferrer" className='DevName'> <BsGithub/> Rajath Gatty</a>
          <a href='https://github.com/naveej' target="_blank" rel="noopener noreferrer" className='DevName'> <BsGithub/> V Jeevan Kumar</a>
          <a href='https://github.com/siddharthkm121' target="_blank" rel="noopener noreferrer" className='DevName'> <BsGithub/> Siddharth KM</a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;