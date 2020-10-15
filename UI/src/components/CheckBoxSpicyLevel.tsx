import * as React from "react"
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { IUser } from '../../../Api/src/models/IUser';
import { Gender } from "../../../Api/src/models/Gender";
import { Hottness } from "../../../Api/src/models/Hottness";
import axios from "axios"

const stackTokens = { childrenGap: 10 };

let user: IUser = {
  "name": "Ori Molad",
  sex: Gender.MALE,
  "age": 10,
  "allergies": [],
  "address": "71 amberwood Lane",
  hottness: [],
  "subscription_level": null
}
var userReq = axios({
  method: 'get',
  url: 'http://localhost:3000/user/Ori Molad/',
})
  .then(function (response) {
    return response.data
  })
const useUserHook = () => {
  let [user, setUserState] = React.useState<IUser | undefined>();
  userReq.then((user) => setUserState(user))
    return user;
}


// axios({
//   method: 'patch',
//   url: 'http://localhost:3000/user/',
//   data: {
//     // Name: "Ori Molad",
//     // Address: 'under a rock'
//   }
// }).then(function (response) {
//   console.log('patched user')
//   console.log(response.data)
// });

// axios.post('http://localhost:3000/user/', {
//   Name: 'Fred Flintsone'
  
// })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// axios({
//   method: 'delete',
//   url: 'http://localhost:3000/user/Ori Molad/',
// })
//   .then(function (response) {
//     console.log('The following is deleted:', response.data)
//   });

export const CheckboxWithChangeHandler = ({label}:{label:string}) => {
  let user = useUserHook();
  console.log(user)
  const onChange = React.useCallback((ev:any, isChecked:boolean)=>{
    if(isChecked === true){
      user.hottness.push(Hottness[label])
    }else{
      let index = user.hottness.indexOf(Hottness[label])
      user.hottness.splice(index,1)
    }
    console.log(user.hottness)

    console.log(`The option has been added: ${isChecked}, and the label is ${label}.`);

  //add or remove that hottness from the hottness list
  //update the user hottness in the database with axios
  },[label])
  return <Checkbox label={label} onChange={onChange}/>
}

export const CheckboxBasic: React.FunctionComponent = () => {
  let userPromise = useUserHook();
  // These checkboxes are uncontrolled because they don't set the `checked` prop.
  return (
    <Stack tokens={stackTokens}>
      <CheckboxWithChangeHandler label="Mild"/>
      <CheckboxWithChangeHandler label="Medium" />
      <CheckboxWithChangeHandler label="Hot" />
      <CheckboxWithChangeHandler label="NonSense" />

     
    </Stack>
  );
};
