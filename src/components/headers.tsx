"use client"
import LoginSvg from '@/assets/svg/loginSvg';
import SearchDock from '@/assets/svg/SearchDock';
import { useGlobalContext } from '@/providers/stores';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import "@/css/headers.css"

const Headers = () => {
  const { dispatch } = useGlobalContext();

  return (
    <div className='headers-container'>
      <div className='header-wrapper container-section'>
        <Link href={"/"}>
          <Image
            src="https://evermos.com/home/wp-content/uploads/2022/03/LP-Regist-EVM_Brand-Logo-02.png"
            alt='logo_not_found'
            width={205}
            height={46}
          />
        </Link>
        <div className='search-bar-container' onClick={() => dispatch({ isModalOpen: true })}>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Cari di Evermos"
            />
            <button className="search-button">
              <SearchDock />
            </button>
          </div>
        </div>

        <button className='button-login'>
          Masuk/Daftar
        </button>
        
        <div className='headers-mobile'>
          <div className='cursor-pointer' onClick={() => dispatch({ isModalOpen: true })}>
            <SearchDock
              width={30}
              height={30}
            />
          </div>
          <div className='cursor-pointer'>
            <LoginSvg
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Headers;
