import "./footer.scss"
import React from "react";
import {FaFacebook, FaTiktok} from "react-icons/fa6";
import {FaYoutube} from "react-icons/fa";
import {iconArrow} from "../../utils/data/index.jsx";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container-fluid bg-dark text-light footer wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-white mb-3">
                                <img src="https://hoptac.novaspro.vn/img/logonovaedu.png" alt=""/>
                            </h4>
                            <h5 className="text-uppercase text-white fw-bold"
                                style={{fontSize: '2rem', lineHeight: '2.8rem'}}>Công ty cổ phần công nghệ giáo dục
                                nova</h5>
                            <div className="d-flex pt-2">
                                <a className="btn btn-social"
                                   href="https://www.facebook.com/NovaEdu.vn">
                                    <FaFacebook/>
                                </a>
                                <a className="btn btn-social"
                                   href="https://www.facebook.com/NovaEdu.vn">
                                    <FaTiktok/>
                                </a>
                                <a className="btn  btn-social"
                                   href="https://www.youtube.com/c/NovaeduNh%C3%A2nl%E1%BB%B1cth%E1%BB%9Dik%E1%BB%B340">
                                    <FaYoutube/>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-3">Hệ sinh thái</h5>
                            <a className="btn btn-link" target="_blank" href="https://novaspro.vn/">
                                {iconArrow} novaspro.vn</a>
                            <a className="btn btn-link" target="_blank" href="https://novateen.vn/">
                                {iconArrow} novateen.vn</a>
                            <a className="btn btn-link" target="_blank" href="https://novaup.vn/">
                                {iconArrow} novaup.vn</a>
                            <a className="btn btn-link" target="_blank" href="https://novaboos.vn/">
                                {iconArrow} novaboos.vn</a>
                            <a className="btn btn-link" target="_blank" href="https://novabook.vn/">
                                {iconArrow} novabook.vn</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-3 text-uppercase">khóa đào tạo của novaTeen</h5>
                            <a className="btn btn-link" href="">
                                {iconArrow} Lớp 6</a>
                            <a className="btn btn-link" href="">
                                {iconArrow} Lớp 7</a>
                            <a className="btn btn-link" href="">
                                {iconArrow} Lớp 8</a>
                            <a className="btn btn-link" href="">
                                {iconArrow} Lớp 9</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-3">Liên hệ</h5>
                            <p className="mb-2 d-flex lienhe btn btn-link align-items-center">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5.625 10.8398C5.625 5.84844 9.86849 1.875 15 1.875C20.1315 1.875 24.375 5.84844 24.375 10.8398C24.375 13.6538 22.8536 17.1352 21.1869 20.1444C19.4953 23.1987 17.5472 25.9504 16.5024 27.3613C16.33 27.597 16.1046 27.7888 15.8444 27.9213C15.5828 28.0544 15.2935 28.1238 15 28.1238C14.7065 28.1238 14.4172 28.0544 14.1556 27.9213C13.8953 27.7888 13.6699 27.5969 13.4975 27.3613C12.4528 25.9498 10.5047 23.1971 8.81304 20.1424C7.14649 17.133 5.625 13.6518 5.625 10.8398ZM15 3.75C10.8151 3.75 7.5 6.9707 7.5 10.8398C7.5 13.1256 8.79101 16.2323 10.4533 19.2341C12.0861 22.1825 13.9773 24.8575 15 26.2396C16.0227 24.8581 17.9139 22.1841 19.5467 19.236C21.2089 16.2348 22.5 13.1277 22.5 10.8398C22.5 6.9707 19.1849 3.75 15 3.75Z"
                                          fill="#00EE5F"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M15 9.375C13.9645 9.375 13.125 10.2145 13.125 11.25C13.125 12.2855 13.9645 13.125 15 13.125C16.0355 13.125 16.875 12.2855 16.875 11.25C16.875 10.2145 16.0355 9.375 15 9.375ZM11.25 11.25C11.25 9.17893 12.9289 7.5 15 7.5C17.0711 7.5 18.75 9.17893 18.75 11.25C18.75 13.3211 17.0711 15 15 15C12.9289 15 11.25 13.3211 11.25 11.25Z"
                                          fill="#00EE5F"/>
                                </svg>
                                <span>22 Thành Công, Ba Đình, Hà Nội</span>
                            </p>
                            <p className="mb-2 d-flex lienhe btn btn-link align-items-center">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M27.5 21.1501V24.9001C27.5015 25.2482 27.4301 25.5928 27.2907 25.9118C27.1512 26.2308 26.9467 26.5171 26.6901 26.7525C26.4336 26.9878 26.1308 27.167 25.801 27.2785C25.4712 27.39 25.1218 27.4315 24.775 27.4001C20.9286 26.9822 17.2338 25.6678 13.9875 23.5626C10.9673 21.6435 8.40671 19.0828 6.48754 16.0626C4.37501 12.8016 3.06034 9.08886 2.65004 5.22512C2.6188 4.87945 2.65988 4.53107 2.77066 4.20215C2.88145 3.87323 3.0595 3.57098 3.2935 3.31465C3.52749 3.05831 3.81229 2.85351 4.12978 2.71327C4.44726 2.57304 4.79046 2.50045 5.13754 2.50012H8.88754C9.49417 2.49415 10.0823 2.70897 10.5422 3.10454C11.0022 3.5001 11.3026 4.04943 11.3875 4.65012C11.5458 5.8502 11.8394 7.02853 12.2625 8.16262C12.4307 8.61003 12.4671 9.09626 12.3674 9.56372C12.2677 10.0312 12.0361 10.4603 11.7 10.8001L10.1125 12.3876C11.892 15.5171 14.4831 18.1082 17.6125 19.8876L19.2 18.3001C19.5399 17.964 19.969 17.7324 20.4364 17.6327C20.9039 17.533 21.3901 17.5694 21.8375 17.7376C22.9716 18.1608 24.15 18.4543 25.35 18.6126C25.9572 18.6983 26.5118 19.0041 26.9082 19.472C27.3046 19.9398 27.5152 20.5371 27.5 21.1501Z"
                                        stroke="#00EE5F" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <span>0966 065 951</span>
                            </p>
                            <p className="mb-2 d-flex lienhe btn btn-link align-items-center">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                                        stroke="#00EE5F" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path d="M2.5 15H27.5" stroke="#00EE5F" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                    <path
                                        d="M15 2.5C18.1266 5.92294 19.9034 10.365 20 15C19.9034 19.635 18.1266 24.0771 15 27.5C11.8734 24.0771 10.0966 19.635 10 15C10.0966 10.365 11.8734 5.92294 15 2.5V2.5Z"
                                        stroke="#00EE5F" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <a href='http://novateen.vn'>www.novateen.vn</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-12 text-center">
                                <a className="">2024 All Right Reserved by NOVAEDU</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer