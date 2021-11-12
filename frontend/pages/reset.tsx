import React from "react";
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const ResetPage = ({ query }: any) => {
  if (!query.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
};

export default ResetPage;
// itemId: 'ckvsfv23n1485obu11e87bj1r',
//   identity: 'afaf@fdf.dfasf',
//   token: 'Acjb1ipCSrO7ZjQslKRf',
