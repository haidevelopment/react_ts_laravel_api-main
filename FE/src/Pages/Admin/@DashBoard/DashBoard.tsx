import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.headTitle}>
        <div className={styles.left}>
          <h1>Dashboard</h1>
          <ul className={styles.breadcrumb}>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li><i className='bx bx-chevron-right'></i></li>
            <li>
              <a className={styles.active} href="#">Home</a>
            </li>
          </ul>
        </div>
        <a href="#" className={styles.btnDownload}>
          <i className='bx bxs-cloud-download'></i>
          <span className={styles.text}>Download PDF</span>
        </a>
      </div>

      <ul className={styles.boxInfo}>
        <li>
          <i className='bx bxs-calendar-check'></i>
          <span className={styles.text}>
            <h3>1020</h3>
            <p>New Order</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-group'></i>
          <span className={styles.text}>
            <h3>2834</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-dollar-circle'></i>
          <span className={styles.text}>
            <h3>$2543</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>

      <div className={styles.tableData}>
        <div className={styles.order}>
          <div className={styles.head}>
            <h3>Recent Orders</h3>
            <i className='bx bx-search'></i>
            <i className='bx bx-filter'></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="img/people.png" alt="User" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span className={`${styles.status} ${styles.completed}`}>Completed</span></td>
              </tr>
              <tr>
                <td>
                  <img src="img/people.png" alt="User" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span className={`${styles.status} ${styles.pending}`}>Pending</span></td>
              </tr>
              <tr>
                <td>
                  <img src="img/people.png" alt="User" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span className={`${styles.status} ${styles.process}`}>Process</span></td>
              </tr>
              <tr>
                <td>
                  <img src="img/people.png" alt="User" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span className={`${styles.status} ${styles.pending}`}>Pending</span></td>
              </tr>
              <tr>
                <td>
                  <img src="img/people.png" alt="User" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span className={`${styles.status} ${styles.completed}`}>Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.todo}>
          <div className={styles.head}>
            <h3>Todos</h3>
            <i className='bx bx-plus'></i>
            <i className='bx bx-filter'></i>
          </div>
          <ul className={styles.todoList}>
            <li className={styles.completed}>
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
            <li className={styles.completed}>
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
            <li className={styles.notCompleted}>
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
            <li className={styles.completed}>
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
            <li className={styles.notCompleted}>
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
