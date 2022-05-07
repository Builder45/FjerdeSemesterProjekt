import axios from "axios";
import { useEffect } from "react";

export async function getServerSideProps(context) {

  const response = await axios.post("http://localhost:5117/api/" + 'Auth/RefreshToken', {
    userId: "976f6403-553c-4597-bc0d-1ca0291e1c46",
    refreshToken: "vCHcizJssGXuT9VJjBPr5JO6Hzjac35GZf2BbDFi8iU="
  });

  return {
    props: {
      data: response.data
    }
  }

}

function UserIndexPage(props) {
  console.log(props.data);
  return (
    <div>Test</div>
  );
}

export default UserIndexPage;