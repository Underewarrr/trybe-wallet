import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expenses />
        <ExpensesTable />
      </>);
  }
}

export default Wallet;
