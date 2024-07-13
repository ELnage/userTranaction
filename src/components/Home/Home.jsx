import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../loading/Loading';
import TransactionsChart from '../TransactionsChart/TransactionsChart';
import './home.css'
import toast from 'react-hot-toast';

export default function Home() {
  const [usersData, setUsersData] = useState([]);
  const [operatorSelected, setOperatorSelected] = useState(">=");
  const [nameSearchValue, setNameSearchValue] = useState("");
  const [amountSearchValue, setAmountSearchValue] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [chartType, setChartType] = useState("line")
  function getUsersData() {
    return axios.get('https://elnage.github.io/userTranactionJson/data.json');
  }
  const { data, isLoading, isError } = useQuery('users', getUsersData);

  useEffect(() => {
    if (data) {
      filterTransactions();
    }
  }, [data, nameSearchValue, amountSearchValue, operatorSelected]);
  
  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <Loading/>;
  }
  const customers = data.data.customers;
  const transactions = data.data.transactions;
  const customersWithTransactions = transactions.map((transaction) => {
    const customer = customers.find((customer) => customer.id === transaction.customer_id);
    return { ...customer, ...transaction };
  });


  function filterTransactions() {
    let filteredTransactions = customersWithTransactions;

    if (nameSearchValue) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.name.toLowerCase().includes(nameSearchValue.toLowerCase())
      );
    }

    if (amountSearchValue) {
      switch (operatorSelected) {
        case ">=":
          filteredTransactions = filteredTransactions.filter((transaction) =>
            parseFloat(transaction.amount) >= parseFloat(amountSearchValue)
          );
          break;
        case "<=":
          filteredTransactions = filteredTransactions.filter((transaction) =>
            parseFloat(transaction.amount) <= parseFloat(amountSearchValue)
          );
          break;
        default:
          break;
      }
    }

    setUsersData(filteredTransactions);
  }

  function handelAmountSearch(e) {

    if(isNaN(e.target.value) || e.target.value < 0) {
      e.target.value = ""
      toast.error("Please enter a positive number")
      
  } else {
      setAmountSearchValue(e.target.value)
  }
  }
  function getSelectedCustomerTransactions(customerId) {

    const customerTransactions = customersWithTransactions.filter((customer)=> customer.customer_id === customerId)
    setSelectedCustomer(customerTransactions)
    toast.success('Customer Selected')
  }

  return (
    <>
      <div className='container py-3'>
        <h1 className='text-center p-3'>Customers Transactions</h1>
        <div className="row g-3">
          <div className="col-md-6">
            <div>
              <input
                onInput={(e) => setNameSearchValue(e.target.value)}
                type="text"
                className='form-control'
                placeholder='Search by name'
              />
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <input
                onInput={(e) => handelAmountSearch(e)}
                type="text"
                className='form-control'
                placeholder='Search by amount'
              />
            </div>
          </div>
          <div className=" col-md-3 ">
            <div>
              <div className="select-container position-relative">
              <select 
                className='form-control select-operator '
                onChange={(e) => setOperatorSelected(e.target.value)}
              >
                <option value=">=">Greater or equal</option>
                <option value="<=">Less or equal</option>
              </select>
              </div>
            </div>
          </div>
        </div>
        <table className="table rounded-4 shadow mt-3 my-table">
          <thead className="table-dark ">
            <tr>
              <th className='px-3'><i className="fa-solid fa-user"></i> Name</th>
              <th className='px-3'><i className="fa-regular fa-calendar-days"></i> Date</th>
              <th className='px-3'><i className="fa-solid fa-sack-dollar"></i> Amount</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index} onClick={()=>getSelectedCustomerTransactions(user.customer_id)} className='' >
                <td className='py-3 px-3'><i className="fa-solid fa-user"></i> {user.name}</td>
                <td className='py-3 px-3'><i className="fa-regular fa-calendar-days"></i> {user.date}</td>
                <td className='py-3 px-3'><i className="fa-solid fa-sack-dollar"></i> {user.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='d-flex justify-content-center align-items-center my-4 '>
              <input type="radio" id="line" defaultChecked name='chart' className='d-none' value={"line"} onInput={(e) => setChartType(e.target.value)} />
              <label htmlFor="line" className='chart-label position-relative m-3 rounded-3  '>
              <i className="fa-solid fa-chart-line me-1"></i> 
                line
            </label>
              <input type="radio" name="chart" id="bar"  className='d-none' value={"bar"}onInput={(e) => setChartType(e.target.value)} />
            <label htmlFor="bar" className='chart-label position-relative m-3 rounded-3 '>
              <i className="fa-solid fa-chart-bar me-1"></i>
              bar
            </label>
        </div>
      <TransactionsChart selectedCustomer={selectedCustomer} chartType={chartType}/>
      </div>
    </>
  );
}
