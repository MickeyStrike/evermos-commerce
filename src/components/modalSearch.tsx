"use client"
import React, { useEffect, useRef, ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalContext } from '@/providers/stores';
import { useDebounce, useMinimizedState } from '@/helper';
import { IResponseProduct } from '@/types';
import useFrontendServices from '@/services/frontend-services';
import '@/css/modalSearch.css'

interface IStateLocal {
  dataProduct: IResponseProduct[];
  loading: boolean;
  error: string;
  valueInput: string;
}

const ModalSearchProduct = () => {
  const { state, dispatch } = useGlobalContext();
  
  const [stateLocal, dispatchLocal] = useMinimizedState<IStateLocal>({
    dataProduct: [],
    loading: false,
    error: '',
    valueInput: ''
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { getProductBySearch } = useFrontendServices();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch({ isModalOpen: false });
      }
    };

    if (state.isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('overflow-hidden');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    };
  }, [state.isModalOpen]);

  useEffect(() => {
    if (state.isModalOpen) {
      inputRef.current?.focus();
    }
  }, [state.isModalOpen]);

  useDebounce((valueInput) => {
    dispatchLocal({ loading: true });
    getProductBySearch(valueInput)
      .then((res) => {
        dispatchLocal({ dataProduct: res.data.products });
      })
      .catch(() => {
        dispatchLocal({ error: 'Product Not Found' });
      })
      .finally(() => dispatchLocal({ loading: false }));
  }, [stateLocal.valueInput]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length === 0) {
      dispatchLocal({
        valueInput: "",
        dataProduct: [],
        loading: false,
        error: ''
      });
    } else {
      dispatchLocal({
        valueInput: query,
        loading: true
      });
    }
  };

  return (
    <AnimatePresence>
      {state.isModalOpen && (
        <motion.div
          className="modal-search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <motion.div
            ref={modalRef}
            className="modal-search-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-search-input-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="modal-search-icon"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="modal-search-input"
                placeholder="Search..."
                type="text"
                ref={inputRef}
                onChange={handleInputChange}
                value={stateLocal.valueInput}
              />
            </div>
            <ul className="modal-search-result-list">
              {stateLocal.loading && (
                <li className="modal-search-loading">Loading...</li>
              )}
              {!stateLocal.loading && stateLocal.error && (
                <li className="modal-search-error">{stateLocal.error}</li>
              )}
              {!stateLocal.loading && !stateLocal.error && stateLocal.dataProduct.length > 0 && stateLocal.dataProduct.map((product, index) => (
                <Link href={`/${product.id}`} key={index} onClick={() => dispatch({ isModalOpen: false })}>
                  <li className="modal-search-item">
                    <Image alt={product.title} loading="lazy" width={300} height={300} className="modal-search-img" sizes="100vw" src={product.thumbnail} />
                    <span>{product.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalSearchProduct;
