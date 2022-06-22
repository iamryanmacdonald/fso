import { connect } from "react-redux";

import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={(event) => setFilter(event.target.value)} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

const ConnectedFilter = connect((state) => ({}), mapDispatchToProps)(Filter);
export default ConnectedFilter;
