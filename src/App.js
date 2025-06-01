import React, { useState } from 'react';
import './index.css';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessage('Email успешно отправлен!');
      setIsError(false);
      setEmail('');
    } else {
      setMessage('Ошибка: неверный формат электронной почты.');
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <label>
        Электронная почта:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          required
        />
      </label>
      <button type="submit">Отправить</button>
      {message && (
        <p className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

const productsData = [
  { id: 1, name: 'Ноутбук', price: 45000, quantity: 5 },
  { id: 2, name: 'Монитор', price: 15000, quantity: 2 },
  { id: 3, name: 'Мышь', price: 700, quantity: 0 },
  { id: 4, name: 'Клавиатура', price: 1200, quantity: 10 },
  { id: 5, name: 'Принтер', price: 8000, quantity: 1 },
];

const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

const ProductCatalog = () => {
  const [products, setProducts] = useState(productsData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortProducts = (key) => {
    let direction = SORT_DIRECTIONS.ASC;
    if (sortConfig.key === key && sortConfig.direction === SORT_DIRECTIONS.ASC) {
      direction = SORT_DIRECTIONS.DESC;
    }

    const sortedProducts = [...products].sort((a, b) => {
      if (key === 'name') {
        if (a[key] < b[key]) return direction === SORT_DIRECTIONS.ASC ? -1 : 1;
        if (a[key] > b[key]) return direction === SORT_DIRECTIONS.ASC ? 1 : -1;
        return 0;
      } else {
        return direction === SORT_DIRECTIONS.ASC
          ? a[key] - b[key]
          : b[key] - a[key];
      }
    });

    setProducts(sortedProducts);
    setSortConfig({ key, direction });
  };
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === SORT_DIRECTIONS.ASC ? ' ▲' : ' ▼';
  };

  return (
    <div className="product-catalog">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortProducts('id')} style={{ cursor: 'pointer' }}>
              № {renderSortArrow('id')}
            </th>
            <th onClick={() => sortProducts('name')} style={{ cursor: 'pointer' }}>
              Название {renderSortArrow('name')}
            </th>
            <th onClick={() => sortProducts('price')} style={{ cursor: 'pointer' }}>
              Цена {renderSortArrow('price')}
            </th>
            <th onClick={() => sortProducts('quantity')} style={{ cursor: 'pointer' }}>
              Количество {renderSortArrow('quantity')}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            let rowClass = '';
            if (product.quantity === 0) rowClass = 'out-of-stock';
            else if (product.quantity < 3) rowClass = 'low-stock';

            return (
              <tr key={product.id} className={rowClass}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString('ru-RU')} ₽</td>
                <td>{product.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="totals">
        <p>Общее количество товаров: <b>{totalQuantity}</b></p>
        <p>Общая стоимость товаров: <b>{totalPrice.toLocaleString('ru-RU')} ₽</b></p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="app">
      <section>
        <h2>Задание 1 — Форма электронной почты</h2>
        <EmailForm />
      </section>

      <section>
        <h2>Задание 2 — Каталог товаров</h2>
        <ProductCatalog />
      </section>
    </div>
  );
}
