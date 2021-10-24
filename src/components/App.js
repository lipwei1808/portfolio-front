import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import EditProfile from "./EditProfile";
import AddTransactionPage from "./stocks/transactions/AddTransactionPage";
import PortfolioPage from "./stocks/portfolio/PortfolioPage";
import EditBalance from "./edit-balance/EditBalance";

//IDEAS
//TODO: Portfolio value => graphical display of cash balance every month?

// Transactions
//TODO: Improve transaction details input
//TODO: Responsiveness when shrink, trade details overlap portfolio selection
//TODO: Buying/selling filter

// Portfolio
//TODO: When click portfolio => highlight chart

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/add-transaction" component={AddTransactionPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/edit-balance" component={EditBalance} />
      </Switch>
    </Router>
  );
}

export default App;
