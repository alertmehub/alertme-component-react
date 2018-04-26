import React, {Component} from 'react';
import DeliveryOptions from '../DeliveryOptions';
import './styles.css';

export default class Subscriber extends Component {
  render() {
    return (
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" className="chat"><symbol id="chat" viewBox="0 0 511.626 511.626"><title>text</title><path d="M477.371,127.44c-22.843-28.074-53.871-50.249-93.076-66.523c-39.204-16.272-82.035-24.41-128.478-24.41c-34.643,0-67.762,4.805-99.357,14.417c-31.595,9.611-58.812,22.602-81.653,38.97c-22.845,16.37-41.018,35.832-54.534,58.385 C6.757,170.833,0,194.484,0,219.228c0,28.549,8.61,55.3,25.837,80.234c17.227,24.931,40.778,45.871,70.664,62.811 c-2.096,7.611-4.57,14.846-7.426,21.693c-2.855,6.852-5.424,12.474-7.708,16.851c-2.286,4.377-5.376,9.233-9.281,14.562 c-3.899,5.328-6.849,9.089-8.848,11.275c-1.997,2.19-5.28,5.812-9.851,10.849c-4.565,5.048-7.517,8.329-8.848,9.855 c-0.193,0.089-0.953,0.952-2.285,2.567c-1.331,1.615-1.999,2.423-1.999,2.423l-1.713,2.566c-0.953,1.431-1.381,2.334-1.287,2.707 c0.096,0.373-0.094,1.331-0.57,2.851c-0.477,1.526-0.428,2.669,0.142,3.433v0.284c0.765,3.429,2.43,6.187,4.998,8.277 c2.568,2.092,5.474,2.95,8.708,2.563c12.375-1.522,23.223-3.606,32.548-6.276c49.87-12.758,93.649-35.782,131.334-69.097 c14.272,1.522,28.072,2.286,41.396,2.286c46.442,0,89.271-8.138,128.479-24.417c39.208-16.272,70.233-38.448,93.072-66.517 c22.843-28.062,34.263-58.663,34.263-91.781C511.626,186.108,500.207,155.509,477.371,127.44z"/></symbol><symbol id="phone-call" viewBox="0 0 438.536 438.536"><title>telephone-symbol-button</title><path d="M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123 C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126 h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225 C438.532,59.576,430.49,40.204,414.41,24.123z M359.159,332.874c-3.997,8.754-12.99,16.371-26.977,22.846 c-13.99,6.475-26.413,9.712-37.265,9.712c-3.046,0-6.283-0.235-9.708-0.711c-3.426-0.479-6.324-0.952-8.703-1.428 c-2.378-0.476-5.523-1.331-9.421-2.57c-3.905-1.234-6.715-2.189-8.422-2.854c-1.718-0.664-4.856-1.854-9.421-3.566 c-4.569-1.718-7.427-2.765-8.562-3.138c-31.215-11.427-61.721-32.028-91.507-61.814c-29.786-29.793-50.391-60.292-61.812-91.502 c-0.378-1.143-1.425-3.999-3.14-8.565c-1.712-4.565-2.905-7.708-3.571-9.419c-0.662-1.713-1.615-4.521-2.853-8.42 c-1.237-3.903-2.091-7.041-2.568-9.423c-0.478-2.376-0.95-5.277-1.427-8.704c-0.476-3.427-0.713-6.667-0.713-9.71 c0-10.85,3.237-23.269,9.71-37.259c6.472-13.988,14.084-22.981,22.841-26.979c10.088-4.189,19.7-6.283,28.837-6.283 c2.091,0,3.616,0.192,4.565,0.572c0.953,0.385,2.524,2.094,4.714,5.14c2.19,3.046,4.568,6.899,7.137,11.563 c2.57,4.665,5.092,9.186,7.566,13.562c2.474,4.377,4.854,8.705,7.139,12.991c2.284,4.279,3.711,6.995,4.281,8.133 c0.571,0.957,1.809,2.762,3.711,5.429c1.902,2.663,3.333,5.039,4.283,7.135c0.95,2.094,1.427,4.093,1.427,5.996 c0,2.859-1.953,6.331-5.854,10.42c-3.903,4.093-8.186,7.854-12.85,11.281s-8.945,7.092-12.847,10.994 c-3.899,3.899-5.852,7.087-5.852,9.562c0,1.333,0.333,2.902,1,4.71c0.666,1.812,1.285,3.287,1.856,4.427 c0.571,1.141,1.477,2.76,2.712,4.856c1.237,2.096,2.048,3.427,2.426,3.999c10.467,18.843,22.508,35.07,36.114,48.681 c13.612,13.613,29.836,25.648,48.682,36.117c0.567,0.384,1.902,1.191,4.004,2.43c2.091,1.232,3.713,2.136,4.853,2.707 c1.143,0.571,2.614,1.191,4.425,1.852c1.811,0.664,3.381,0.999,4.719,0.999c3.036,0,7.225-3.138,12.56-9.418 c5.328-6.286,10.756-12.518,16.276-18.705c5.516-6.181,9.985-9.274,13.418-9.274c1.902,0,3.897,0.473,5.999,1.424 c2.095,0.951,4.469,2.382,7.132,4.284c2.669,1.91,4.476,3.142,5.428,3.721l15.125,8.271c10.089,5.332,18.511,10.041,25.27,14.134 s10.424,6.899,10.996,8.419c0.379,0.951,0.564,2.478,0.564,4.572C365.449,313.199,363.354,322.812,359.159,332.874z"/></symbol><symbol id="email" viewBox="0 0 511.626 511.626"><title>email</title><path d="M49.106,178.729c6.472,4.567,25.981,18.131,58.528,40.685c32.548,22.554,57.482,39.92,74.803,52.099 c1.903,1.335,5.946,4.237,12.131,8.71c6.186,4.476,11.326,8.093,15.416,10.852c4.093,2.758,9.041,5.852,14.849,9.277 c5.806,3.422,11.279,5.996,16.418,7.7c5.14,1.718,9.898,2.569,14.275,2.569h0.287h0.288c4.377,0,9.137-0.852,14.277-2.569 c5.137-1.704,10.615-4.281,16.416-7.7c5.804-3.429,10.752-6.52,14.845-9.277c4.093-2.759,9.229-6.376,15.417-10.852 c6.184-4.477,10.232-7.375,12.135-8.71c17.508-12.179,62.051-43.11,133.615-92.79c13.894-9.703,25.502-21.411,34.827-35.116 c9.332-13.699,13.993-28.07,13.993-43.105c0-12.564-4.523-23.319-13.565-32.264c-9.041-8.947-19.749-13.418-32.117-13.418H45.679 c-14.655,0-25.933,4.948-33.832,14.844C3.949,79.562,0,91.934,0,106.779c0,11.991,5.236,24.985,15.703,38.974 C26.169,159.743,37.307,170.736,49.106,178.729z"/><path d="M483.072,209.275c-62.424,42.251-109.824,75.087-142.177,98.501c-10.849,7.991-19.65,14.229-26.409,18.699 c-6.759,4.473-15.748,9.041-26.98,13.702c-11.228,4.668-21.692,6.995-31.401,6.995h-0.291h-0.287 c-9.707,0-20.177-2.327-31.405-6.995c-11.228-4.661-20.223-9.229-26.98-13.702c-6.755-4.47-15.559-10.708-26.407-18.699 c-25.697-18.842-72.995-51.68-141.896-98.501C17.987,202.047,8.375,193.762,0,184.437v226.685c0,12.57,4.471,23.319,13.418,32.265 c8.945,8.949,19.701,13.422,32.264,13.422h420.266c12.56,0,23.315-4.473,32.261-13.422c8.949-8.949,13.418-19.694,13.418-32.265 V184.437C503.441,193.569,493.927,201.854,483.072,209.275z"/></symbol></svg>

      <div className="am-row">
        <DeliveryOptions />
      </div>
      </div>
    );
  }
}